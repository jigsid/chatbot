import TabsMenu from '@/components/tabs/intex'
import { TabsContent } from '@/components/ui/tabs'
import { HELP_DESK_TABS_MENU } from '@/constants/menu'
import React from 'react'
import HelpDesk from './help-desk'
import FilterQuestions from './filter-questions'

type Props = {
  id: string
}

const BotTrainingForm = ({ id }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl text-slate-900 dark:text-white">Bot Training</h2>
        <p className="text-sm font-light text-slate-600 dark:text-slate-300">
          Set FAQ questions, create questions for capturing lead information and
          train your bot to act the way you want it to.
        </p>
      </div>
      <div className="w-full mt-1">
        <TabsMenu triggers={HELP_DESK_TABS_MENU}>
          <TabsContent
            value="help desk"
            className="w-full mt-4"
          >
            <HelpDesk id={id} />
          </TabsContent>
          <TabsContent 
            value="questions"
            className="w-full mt-4"
          >
            <FilterQuestions id={id} />
          </TabsContent>
        </TabsMenu>
      </div>
    </div>
  )
}

export default BotTrainingForm
