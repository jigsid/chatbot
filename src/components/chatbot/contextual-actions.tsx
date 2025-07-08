'use client'

import React from 'react'
import { Calendar, FileText, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

type ActionType = 'schedule' | 'document' | 'contact' | 'reminder' | 'link';

type Action = {
  type: ActionType;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

type Props = {
  messages: { role: 'assistant' | 'user'; content: string }[];
}

const ContextualActions = ({ messages }: Props) => {
  const [actions, setActions] = React.useState<Action[]>([]);
  const router = useRouter();
  
  // Analyze conversation to determine relevant actions
  React.useEffect(() => {
    if (messages.length === 0) return;
    
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content.toLowerCase() || '';
    const lastBotMessage = [...messages].reverse().find(m => m.role === 'assistant')?.content.toLowerCase() || '';
    
    const newActions: Action[] = [];
    
    // Check for scheduling intent
    if (
      lastUserMessage.includes('schedule') || 
      lastUserMessage.includes('appointment') || 
      lastUserMessage.includes('book') ||
      lastUserMessage.includes('meet') ||
      lastUserMessage.includes('when can') ||
      lastUserMessage.includes('available') ||
      lastBotMessage.includes('schedule') ||
      lastBotMessage.includes('appointment') ||
      lastBotMessage.includes('booking')
    ) {
      newActions.push({
        type: 'schedule',
        label: 'Schedule Appointment',
        icon: <Calendar className="w-3 h-3" />,
        onClick: () => router.push('/appointment')
      });
    }
    
    // Check for document intent
    if (
      lastUserMessage.includes('document') || 
      lastUserMessage.includes('pdf') || 
      lastUserMessage.includes('file') ||
      lastUserMessage.includes('read') ||
      lastBotMessage.includes('document') ||
      lastBotMessage.includes('information')
    ) {
      newActions.push({
        type: 'document',
        label: 'View Documents',
        icon: <FileText className="w-3 h-3" />,
        onClick: () => alert('Opening documents...')
      });
    }
    
    // Check for contact intent
    if (
      lastUserMessage.includes('contact') || 
      lastUserMessage.includes('call') || 
      lastUserMessage.includes('phone') ||
      lastUserMessage.includes('email') ||
      lastBotMessage.includes('contact') ||
      lastBotMessage.includes('reach out')
    ) {
      newActions.push({
        type: 'contact',
        label: 'Contact Us',
        icon: <Phone className="w-3 h-3" />,
        onClick: () => alert('Opening contact form...')
      });
    }
    
    // Check for reminder intent
    if (
      lastUserMessage.includes('remind') || 
      lastUserMessage.includes('later') || 
      lastUserMessage.includes('forget') ||
      lastBotMessage.includes('remind') ||
      lastBotMessage.includes('follow up')
    ) {
      newActions.push({
        type: 'reminder',
        label: 'Set Reminder',
        icon: <Clock className="w-3 h-3" />,
        onClick: () => alert('Setting reminder...')
      });
    }
    
    // Limit to 3 actions maximum
    setActions(newActions.slice(0, 3));
    
  }, [messages, router]);
  
  if (actions.length === 0) return null;
  
  return (
    <motion.div 
      className="flex flex-col gap-1.5 mt-2 self-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-[10px] text-gray-500 font-medium pl-1">Suggested Actions:</p>
      <div className="flex gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            size="sm"
            variant="outline"
            onClick={action.onClick}
            className="h-7 px-2.5 text-[10px] bg-white border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}

export default ContextualActions 