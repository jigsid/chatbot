import { useDomain } from '@/hooks/sidebar/use-domain'
import { cn } from '@/lib/utils'
import React from 'react'
import AppDrawer from '../drawer'
import { Plus } from 'lucide-react'
import { Loader } from '../loader'
import FormGenerator from '../forms/form-generator'
import UploadButton from '../upload-button'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  min?: boolean
  domains:
    | {
        id: string
        name: string
        icon: string | null
      }[]
    | null
    | undefined
}

const DomainMenu = ({ domains, min }: Props) => {
  const { register, onAddDomain, loading, errors, isDomain } = useDomain()

  return (
    <div className={cn('flex flex-col gap-3', min ? 'mt-6' : 'mt-3')}>
      <div className="flex justify-between w-full items-center px-3">
        {!min && <p className="text-xs font-medium text-gray-500">DOMAINS</p>}
        <AppDrawer
          description="add in your domain address to integrate your chatbot"
          title="Add your business domain"
          onOpen={
            <div className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
              <Plus className="w-4 h-4" />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
              className="mt-3 w-6/12 flex flex-col gap-3"
              onSubmit={onAddDomain}
            >
              <FormGenerator
                inputType="input"
                register={register}
                label="Domain"
                name="domain"
                errors={errors}
                placeholder="mydomain.com"
                type="text"
              />
              <UploadButton
                register={register}
                label="Upload Icon"
                errors={errors}
                required={true}
              />
              <Button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-600 text-white"
              >
                Add Domain
              </Button>
            </form>
          </Loader>
        </AppDrawer>
      </div>
      <div className="flex flex-col gap-1 px-2">
        {domains &&
          domains.map((domain) => (
            <Link
              href={`/settings/${domain.name.split('.')[0]}`}
              key={domain.id}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                !min ? 'justify-start' : 'justify-center',
                domain.name.split('.')[0] == isDomain 
                  ? 'bg-white font-medium text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              )}
            >
              {domain.icon ? (
                <Image
                  src={`https://ucarecdn.com/${domain.icon}/`}
                  alt="logo"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-200" />
              )}
              {!min && <span className="text-sm">{domain.name}</span>}
            </Link>
          ))}
      </div>
    </div>
  )
}

export default DomainMenu
