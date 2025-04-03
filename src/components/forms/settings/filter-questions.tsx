'use client'
import Section from '@/components/section-label'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { useFilterQuestions } from '@/hooks/settings/use-settings'
import React from 'react'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'

type Props = {
  id: string
}

const FilterQuestions = ({ id }: Props) => {
  const { register, errors, onAddFilterQuestions, isQuestions, loading } =
    useFilterQuestions(id)

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2 border border-slate-200 dark:border-slate-700 shadow-md">
      <CardContent className="p-6 border-r-[1px] border-slate-200 dark:border-slate-700">
        <CardTitle className="text-slate-900 dark:text-white">Bot Questions</CardTitle>
        <form
          onSubmit={onAddFilterQuestions}
          className="flex flex-col gap-6 mt-6"
        >
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Add a question that you want your chatbot to ask to collect information"
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
              Create Question
            </span>
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 max-h-[350px] overflow-y-auto chat-window bg-slate-50 dark:bg-slate-900 custom-scrollbar">
        <h3 className="font-medium mb-3 text-slate-900 dark:text-white">Existing Questions</h3>
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question) => (
              <p
                key={question.id}
                className="font-bold p-2 border-b mb-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                {question.question}
              </p>
            ))
          ) : (
            <CardDescription className="text-slate-500 dark:text-slate-400">No questions</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  )
}

export default FilterQuestions
