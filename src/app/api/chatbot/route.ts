import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/prisma';
import { extractEmailsFromString, extractURLfromString } from '@/lib/utils';
import { getGeminiModel, startGeminiChat } from '@/config/gemini';

// Fallback responses for when the model is unavailable
const FALLBACK_RESPONSES = [
  "I'm currently experiencing high demand. Could you please try again in a moment?",
  "Our AI system is quite busy at the moment. I'll be fully operational shortly.",
  "Thanks for your message! Our systems are currently processing many requests. I'll be back to normal capacity soon.",
  "I'm currently handling a high volume of requests. Please try again in a few moments.",
  "I apologize for the delay. Our AI service is experiencing high traffic. Please try again shortly."
];

// Get a random fallback response
const getFallbackResponse = () => {
  const index = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
  return FALLBACK_RESPONSES[index];
};

// Simple rule-based response generator for appointment-related queries
const generateAppointmentResponse = (message: string) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('meet')) {
    return "I'd be happy to help you schedule an appointment. We have slots available between 9:00 AM and 5:30 PM on weekdays. You can click the 'Schedule Appointment' button below or visit our Appointments page to select a time that works for you. Would you like me to guide you through the booking process?";
  }
  
  return null;
};

export async function POST(req: NextRequest) {
  try {
    const { id, message, author, chat } = await req.json();
    
    if (!id || !message) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get chatbot domain information
    const chatBotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: true,
        helpdesk: true,
        products: true,
        customer: {
          select: {
            id: true,
            email: true,
            chatRoom: {
              select: {
                id: true,
                live: true,
                mailed: true,
                message: true,
              },
            },
          },
        },
        User: {
          select: {
            clerkId: true,
          },
        },
      },
    });

    if (!chatBotDomain) {
      return NextResponse.json(
        { error: 'Chatbot domain not found' },
        { status: 404 }
      );
    }

    // Check if the message contains an email
    const extractedEmail = extractEmailsFromString(message);
    const customerEmail = extractedEmail ? extractedEmail[0] : null;

    // If email found in message, create or update customer
    if (customerEmail) {
      const checkCustomer = await client.domain.findUnique({
        where: {
          id,
        },
        select: {
          name: true,
          customer: {
            where: {
              email: customerEmail,
            },
            select: {
              id: true,
              chatRoom: {
                select: {
                  id: true,
                  live: true,
                  mailed: true,
                },
              },
            },
          },
          User: {
            select: {
              clerkId: true,
            },
          },
        },
      });

      // Create new customer if not exists
      if (checkCustomer && !checkCustomer.customer.length) {
        const newCustomer = await client.domain.update({
          where: {
            id,
          },
          data: {
            customer: {
              create: {
                email: customerEmail,
                questions: {
                  create: chatBotDomain.filterQuestions,
                },
                chatRoom: {
                  create: {},
                },
              },
            },
          },
        });

        if (newCustomer) {
          const response = {
            role: 'assistant',
            content: `Welcome aboard ${
              customerEmail.split('@')[0]
            }! I'm glad to connect with you. Is there anything you need help with?`,
          };
          
          return NextResponse.json({ response }, { status: 200 });
        }
      }
    }
    
    // Check for appointment-related queries first - this is our rule-based fallback
    const appointmentResponse = generateAppointmentResponse(message);
    if (appointmentResponse) {
      return NextResponse.json({ 
        response: {
          role: 'assistant',
          content: appointmentResponse
        }
      }, { status: 200 });
    }
    
    try {
      // Add system prompt as first user message
      let systemMessage = `You are an AI assistant for ${chatBotDomain.name}. Your communication style should be:
      - Professional yet friendly
      - Clear and concise
      - Helpful and informative
      - Natural and conversational

      You have access to the following help desk information that you should use to answer customer questions:
      ${chatBotDomain.filterQuestions.map((q) => `Question: ${q.question}\nAnswer: ${q.answered || "Not yet answered"}`).join('\n\n')}
      
      You should also be aware of the following products and services:
      ${chatBotDomain.products?.map(p => `Product: ${p.name}, Price: $${p.price}`).join('\n')}
      ${chatBotDomain.helpdesk?.map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n\n')}

      You need to ask the customer these questions during the conversation, but do it naturally without showing them as a list:
      ${chatBotDomain.filterQuestions.map((q) => q.question).join('\n')}
      
      Your primary objectives are:
      1. Welcome the customer warmly
      2. Answer any type of question they have using the help desk information when relevant
      3. At some point in the conversation, politely ask for their email address for follow-up
      4. If they provide their email in any format, acknowledge it and thank them

      APPOINTMENT BOOKING INSTRUCTIONS:
      When a customer expresses interest in booking an appointment or meeting:
      1. Ask for their preferred date and time
      2. Mention available time slots (9:00am to 5:30pm, in 30-minute increments)
      3. Confirm you've noted their preference
      4. Let them know they can click the "Schedule Appointment" button that appears below your message
      5. Explain that they can also go to the Appointments page to complete their booking
      6. Ask if they need any other information before booking

      Important guidelines:
      1. Ask questions naturally as part of the conversation
      2. Don't use markers like [complete] or (realtime)
      3. If the customer's request is beyond your scope, politely inform them that you'll connect them with a human representative
      4. For purchases, you'll provide information about products and services
      5. Always be helpful and provide clear next steps`;

      // Create initial history for the chat
      const initialHistory = [
        {
          role: "user",
          parts: [{ text: systemMessage }],
        },
        {
          role: "model",
          parts: [{ text: `Hello! I'm the AI assistant for ${chatBotDomain.name}. How can I help you today?` }],
        }
      ];

      // Add conversation history
      const chatHistory = [...initialHistory];
      for (const msg of chat) {
        if (msg.role === 'user') {
          chatHistory.push({
            role: "user",
            parts: [{ text: msg.content }],
          });
        } else {
          chatHistory.push({
            role: "model",
            parts: [{ text: msg.content }],
          });
        }
      }

      // Create a chat session with history
      const model = getGeminiModel();
      const chatSession = model.startChat({
        history: chatHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      // Add the current message
      const result = await chatSession.sendMessage([{ text: message }]);
      const response = await result.response;
      const text = response.text();

      if (text) {
        // Check if response contains a URL
        const generatedLink = extractURLfromString(text);

        if (generatedLink) {
          const link = generatedLink[0];
          const response = {
            role: 'assistant',
            content: `I'd be happy to help you with that. You can proceed with the next steps here:`,
            link: link.slice(0, -1),
          };

          return NextResponse.json({ response }, { status: 200 });
        }

        // Return normal response
        const response = {
          role: 'assistant',
          content: text,
        };

        return NextResponse.json({ response }, { status: 200 });
      }

      // If we get here, we didn't get a valid response, use fallback
      return NextResponse.json({
        response: {
          role: 'assistant',
          content: getFallbackResponse()
        }
      }, { status: 200 });
      
    } catch (error: any) {
      console.error('Error with Gemini API:', error);
      
      // Check if it's a 503 Service Unavailable error
      if (error.status === 503 || (error.message && error.message.includes('overloaded'))) {
        console.log('Gemini model overloaded, using fallback response');
        
        // Return a fallback response
        return NextResponse.json({
          response: {
            role: 'assistant',
            content: getFallbackResponse()
          }
        }, { status: 200 });
      }
      
      // For other errors, return a generic error message
      return NextResponse.json({
        response: {
          role: 'assistant',
          content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment."
        }
      }, { status: 200 });
    }
    
  } catch (error) {
    console.error('Error in chatbot API:', error);
    
    // Even if there's an error in our API code, return a friendly message to the user
    return NextResponse.json({
      response: {
        role: 'assistant',
        content: "I apologize for the technical difficulties. Our team has been notified and is working to resolve the issue. Please try again shortly."
      }
    }, { status: 200 });
  }
} 