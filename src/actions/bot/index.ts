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

                You should address a wide range of topics and questions, not just website-related:
                - Product information and recommendations
                - General knowledge questions
                - Technical support
                - Business inquiries
                - And any other reasonable questions

                You need to ask the customer these questions during the conversation, but do it naturally without showing them as a list:
                ${chatBotDomain.filterQuestions.map((q) => q.question).join('\n')}

                Important guidelines:
                1. Ask questions naturally as part of the conversation
                2. Don't use markers like [complete] or (realtime)
                3. If the customer's request is beyond your scope, politely inform them that you'll connect them with a human representative
                4. For appointments, provide this link: ${process.env.NEXT_PUBLIC_URL}portal/${id}/appointment/${checkCustomer?.customer[0].id}
                5. For purchases, provide this link: ${process.env.NEXT_PUBLIC_URL}portal/${id}/payment/${checkCustomer?.customer[0].id}

                Remember to maintain a natural conversation flow and avoid any artificial markers or tags in your responses.`
              }]
            }
          ]
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

              Your primary objectives are:
              1. Welcome the customer warmly
              2. Answer any type of question they have, not just website or product related
              3. At some point in the conversation, politely ask for their email address for follow-up
              4. If they provide their email in any format, acknowledge it and thank them
              
              Important guidelines:
              - You can answer questions on any topic, not just about the website or products
              - ALWAYS try to collect the customer's email address during the conversation
              - Ask for email in a natural way, such as "Would you mind sharing your email so I can send you more information?"
              - If they seem hesitant, assure them their information is secure and will only be used for this conversation
              - Stay in character as a helpful assistant throughout the conversation
              - Be polite and professional
              - Avoid using any artificial markers or tags in your responses`
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
