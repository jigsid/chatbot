import Section from '@/components/section-label'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

type GreetingMessageProps = {
  message: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const GreetingsMessage = ({
  message,
  register,
  errors,
}: GreetingMessageProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Section
        label="Greeting message"
        message="Customize your welcome message - consider asking for email and mentioning your AI can handle various questions"
      />
      <div className="lg:w-[500px]">
        <FormGenerator
          placeholder={message}
          inputType="textarea"
          lines={4}
          register={register}
          errors={errors}
          name="welcomeMessage"
          type="text"
        />
        <p className="text-xs text-slate-500 mt-2">
          Tip: Including a prompt for email and mentioning your chatbot's ability to answer a wide range of questions can improve engagement.
        </p>
      </div>
    </div>
  )
}

export default GreetingsMessage
