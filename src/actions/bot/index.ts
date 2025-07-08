'use server'

import { client } from '@/lib/prisma'
import { extractEmailsFromString, extractURLfromString } from '@/lib/utils'
import { onRealTimeChat } from '../conversation'
import { clerkClient } from '@clerk/nextjs'
import { onMailer } from '../mailer'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const onStoreConversations = async (
  id: string,
  message: string,
  role: 'assistant' | 'user'
) => {
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  })
}

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    })

    if (chatbot) {
      return chatbot
    }
  } catch (error) {
    console.log(error)
  }
}

let customerEmail: string | undefined

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: 'assistant' | 'user'; content: string }[],
  author: 'assistant' | 'user',
  message: string
) => {
  try {
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
    })

    if (chatBotDomain) {
      const extractedEmail = extractEmailsFromString(message)
      const customerEmail = extractedEmail ? extractedEmail[0] : null

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
        })

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
          })
          if (newCustomer) {
            console.log('new customer made')
            const response = {
              role: 'assistant',
              content: `Welcome aboard ${
                customerEmail.split('@')[0]
              }! I'm glad to connect with you. Is there anything you need help with?`,
            }
            return { response }
          }
        }

        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          )

          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            'user',
            author
          )

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            )

            onMailer(user.emailAddresses[0].emailAddress)

            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            })

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              }
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          }
        }

        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        )

        // Initialize Gemini Pro chat with improved prompt
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{
                text: `You are an AI assistant for ${chatBotDomain.name}. Your communication style should be:
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
                5. Always be helpful and provide clear next steps
                `}]
            },
            {
              role: "model",
              parts: [{
                text: `Hello! I'm the AI assistant for ${chatBotDomain.name}. How can I help you today?`
              }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        });

        const result = await chat.sendMessage([{ text: message }]);
        const response = await result.response;
        const text = response.text();

        if (text) {
          const generatedLink = extractURLfromString(text)

          if (generatedLink) {
            const link = generatedLink[0]
            const response = {
              role: 'assistant',
              content: `I'd be happy to help you with that. You can proceed with the next steps here:`,
              link: link.slice(0, -1),
            }

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              'assistant'
            )

            return { response }
          }

          const response = {
            role: 'assistant',
            content: text,
          }

          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            'assistant'
          )

          return { response }
        }
      }

      // Initial conversation without customer email
      console.log('No customer')
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{
              text: `You are an AI assistant for ${chatBotDomain.name}. Your communication style should be:
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

              Important guidelines:
              1. Ask questions naturally as part of the conversation
              2. Don't use markers like [complete] or (realtime)
              3. If the customer's request is beyond your scope, politely inform them that you'll connect them with a human representative
              4. For appointments, you'll help them book through email later
              5. For purchases, you'll provide information about products and services

              Remember to maintain a natural conversation flow and avoid any artificial markers or tags in your responses.`
            }]
          }
        ]
      });

      const result = await chat.sendMessage([{ text: message }]);
      const response = await result.response;
      const text = response.text();

      if (text) {
        const response = {
          role: 'assistant',
          content: text,
        }

        return { response }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
