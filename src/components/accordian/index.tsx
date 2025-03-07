import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger, Accordion as ShadcnAccordion } from '@/components/ui/accordion'

type Props = {
  trigger: string
  content: string
  className?: string
}

const Accordion = ({ content, trigger, className = '' }: Props) => {
  return (
    <ShadcnAccordion
      type="single"
      collapsible
      className={className}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className={className}>{trigger}</AccordionTrigger>
        <AccordionContent className={className}>{content}</AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  )
}

export default Accordion
