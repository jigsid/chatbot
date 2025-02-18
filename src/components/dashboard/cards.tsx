import React from 'react'

type Props = {
  title: string
  value: number
  icon: JSX.Element
  sales?: boolean
}

const DashboardCard = ({ icon, title, value, sales }: Props) => {
  return (
    <div className="rounded-xl flex flex-col gap-3 p-6 bg-white dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 md:w-fit w-full">
      <div className="flex items-center gap-3">
        <div className="text-gray-500 dark:text-gray-400">
          {icon}
        </div>
        <h2 className="font-medium text-gray-600 dark:text-gray-300">{title}</h2>
      </div>
      <p className="font-bold text-3xl text-gray-900 dark:text-white">
        {sales && '$'}
        {value.toLocaleString()}
      </p>
    </div>
  )
}

export default DashboardCard
