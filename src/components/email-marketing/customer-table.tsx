'use client'
import React from 'react'
import { DataTable } from '../table'
import { EMAIL_MARKETING_HEADER } from '@/constants/menu'
import { TableCell, TableRow } from '../ui/table'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { SideSheet } from '../sheet'
import Answers from './answers'
import { CheckCircle2, Circle } from 'lucide-react'

type CustomerTableProps = {
  domains: {
    customer: {
      Domain: {
        name: string
      } | null
      id: string
      email: string | null
    }[]
  }[]
  onSelect(email: string): void
  select: string[]
  onId(id: string): void
  id?: string
}

export const CustomerTable = ({
  domains,
  onSelect,
  select,
  onId,
  id,
}: CustomerTableProps) => {
  return (
    <DataTable headers={EMAIL_MARKETING_HEADER}>
      {domains.map((domain) =>
        domain.customer.map((c) => (
          <TableRow 
            key={c.id} 
            className={cn(
              "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
              select.includes(c.email as string) && "bg-blue-50 dark:bg-blue-900/20"
            )}
            onClick={() => onSelect(c.email as string)}
          >
            <TableCell className="w-10">
              {select.includes(c.email as string) ? (
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
              )}
            </TableCell>
            <TableCell>{c.email}</TableCell>
            <TableCell>
              <SideSheet
                title="Customer Answers"
                description="Customer answers are stored by the bot when your customers respond back to the questions asked by the bot."
                trigger={
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onId(c.id);
                    }}
                  >
                    View Answers
                  </Button>
                }
              >
                <Answers id={id} />
              </SideSheet>
            </TableCell>
            <TableCell className="text-right">{c.Domain?.name || 'Unknown'}</TableCell>
          </TableRow>
        ))
      )}
    </DataTable>
  )
}
