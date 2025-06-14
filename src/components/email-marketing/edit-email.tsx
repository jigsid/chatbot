'use client'
import React, { useState, useEffect } from 'react'
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
import { toast } from '../ui/use-toast'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

type EditEmailProps = {
  id: string
  onCreate(): void
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  setDefault: UseFormSetValue<FieldValues>
  onSelect?: (id: string) => void
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
  onSelect,
}: EditEmailProps) => {
  const { loading, template } = useEditEmail(id)
  const [content, setContent] = useState('')
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  useEffect(() => {
    if (id && onSelect) {
      onSelect(id);
    }
  }, [id, onSelect]);

  useEffect(() => {
    if (template) {
      try {
        // Try parsing as JSON first
        const parsedContent = JSON.parse(template)
        setContent(parsedContent)
        setDefault('description', parsedContent)
      } catch (error) {
        // If template isn't valid JSON, use it as-is
        console.log("Using template as-is:", template.substring(0, 100) + "...")
        setContent(template)
        setDefault('description', template)
      }
    } else {
      // Set default empty content
      const defaultContent = '<p>Enter your email content here...</p>'
      setContent(defaultContent)
      setDefault('description', defaultContent)
    }
  }, [template, setDefault])

  const handleEditorChange = (value: string) => {
    try {
      if (value && value.length > 1000000) { // 1MB limit
        toast({
          title: 'Warning',
          description: 'Content is getting large. This may cause performance issues.',
          variant: 'destructive'
        })
      }
      setContent(value)
      setDefault('description', value)
    } catch (error) {
      console.error("Error updating content:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content || content.trim() === '') {
      toast({
        title: 'Error',
        description: 'Email content cannot be empty',
        variant: 'destructive'
      })
      return
    }
    onCreate()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Loader loading={loading}>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'edit' | 'preview')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleEditorChange}
                modules={modules}
                className="h-[320px]"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%'
                }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message as string}
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <Card className="p-4 max-h-[400px] overflow-y-auto">
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
