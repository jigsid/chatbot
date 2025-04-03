'use client'
import React from 'react'
import { useHelpDesk } from '@/hooks/settings/use-settings'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import Section from '@/components/section-label'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import Accordion from '@/components/accordian'

type Props = {
  id: string
}

const HelpDesk = ({ id }: Props) => {
  const { register, errors, onSubmitQuestion, isQuestions, loading } =
    useHelpDesk(id)

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2 border border-slate-200 dark:border-slate-700 shadow-md">
      <CardContent className="p-6 border-r-[1px] border-slate-200 dark:border-slate-700">
        <CardTitle className="text-slate-900 dark:text-white">Help Desk FAQ</CardTitle>
        <form
          onSubmit={onSubmitQuestion}
          className="flex flex-col gap-6 mt-6"
        >
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Add a question that you believe is frequently asked."
            />
            <FormGenerator
              inputType="input"
              register={register}
              errors={errors}
              name="question"
              placeholder="Type your question"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Answer to question"
              message="The answer for the question above."
            />
            <FormGenerator
              inputType="textarea"
              register={register}
              errors={errors}
              name="answer"
              placeholder="Type your answer"
              type="text"
              lines={3}
            />
          </div>
          <Button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold mt-4 py-5 relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
              </svg>
              Create FAQ
            </span>
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 max-h-[350px] overflow-y-auto chat-window bg-slate-50 dark:bg-slate-900 custom-scrollbar">
        <h3 className="font-medium mb-3 text-slate-900 dark:text-white">Existing FAQs</h3>
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question) => (
              <Accordion
                key={question.id}
                trigger={question.question}
                content={question.answer}
              />
            ))
          ) : (
            <CardDescription className="text-slate-500 dark:text-slate-400">No questions to show</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  )
}

export default HelpDesk
