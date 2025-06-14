import { ZodType, z } from 'zod'
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from './settings.schema'

export type ConversationSearchProps = {
  query: string
  domain: string
}

export type ChatBotMessageProps = {
  content?: string
  image?: any
}

export const ConversationSearchSchema: ZodType<ConversationSearchProps> =
  z.object({
    query: z.string().min(1, { message: 'You must entery a search query' }),
    domain: z.string().min(1, { message: 'You must select a domain' }),
  })

export const ChatBotMessageSchema: ZodType<ChatBotMessageProps> = z
  .object({
    content: z
      .string()
      .optional()
      .or(z.literal('').transform(() => undefined)),
    image: z.any().optional(),
  })
  .refine((schema) => {
    // Ensure at least content or image is provided
    if (!schema.content && (!schema.image || !schema.image.length)) {
      return false;
    }
    
    // Validate image if provided
    if (schema.image?.length) {
      return ACCEPTED_FILE_TYPES.includes(schema.image[0].type) && 
             schema.image[0].size <= MAX_UPLOAD_SIZE;
    }
    
    return true;
  }, {
    message: "Please provide a message or an image"
  })
