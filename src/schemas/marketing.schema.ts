import { ZodType, z } from 'zod'

type EmailMarketingProps = {
  name: string
  selectedContacts?: string[]
}

type EmailMarketingBodyProps = {
  description: string
}

export const EmailMarketingSchema: ZodType<EmailMarketingProps> = z.object({
  name: z
    .string()
    .min(3, { message: 'The campaign name must be at least 3 characters' }),
  selectedContacts: z.array(z.string()).optional()
})

export const EmailMarketingBodySchema: ZodType<EmailMarketingBodyProps> =
  z.object({
    description: z
      .string()
  })
