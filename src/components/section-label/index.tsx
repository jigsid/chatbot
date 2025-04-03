import React from 'react'

type SectionProps = {
  label: string
  message: string
}

const Section = ({ label, message }: SectionProps) => {
  return (
    <div>
      <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
      <p className="text-sm font-light text-slate-600 dark:text-slate-300">{message}</p>
    </div>
  )
}

export default Section
