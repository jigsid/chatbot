'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Loader } from '../loader'
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { useEditEmail } from '@/hooks/email-marketing/use-marketing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card } from '../ui/card'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

type EditEmailProps = {
  id: string
  onCreate(): void
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  setDefault: UseFormSetValue<FieldValues>
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean'],
  ],
}

export const EditEmail = ({
  id,
  onCreate,
  errors,
  register,
  setDefault,
}: EditEmailProps) => {
  const { loading, template } = useEditEmail(id)
  const [content, setContent] = useState(template ? JSON.parse(template) : '')
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  React.useEffect(() => {
    if (template) {
      setContent(JSON.parse(template))
      setDefault('description', JSON.parse(template))
    }
  }, [template, setDefault])

  const handleEditorChange = (value: string) => {
    setContent(value)
    setDefault('description', value)
  }

  return (
    <form onSubmit={onCreate} className="flex flex-col gap-3">
      <Loader loading={loading}>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'edit' | 'preview')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <div className="min-h-[400px]">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleEditorChange}
                modules={modules}
                className="h-[300px] mb-12"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message as string}
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <Card className="p-4">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Card>
          </TabsContent>
        </Tabs>
        <Button type="submit" className="mt-4">Save Template</Button>
      </Loader>
    </form>
  )
}
