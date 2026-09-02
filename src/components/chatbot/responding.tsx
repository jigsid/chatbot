'use client'
import React from 'react'

export const Responding = () => {
  return (
    <div className="flex gap-2 items-end self-start max-w-[88%]">
      <div className="h-6 w-6 rounded-full bg-slate-300 shrink-0" aria-hidden />
      <div className="bg-white border border-slate-200/80 rounded-[16px] rounded-bl-md px-3.5 py-3">
        <div className="flex items-center gap-[5px] h-3.5">
          <span className="widget-dot !bg-slate-400 !w-[5px] !h-[5px]" />
          <span
            className="widget-dot !bg-slate-400 !w-[5px] !h-[5px]"
            style={{ animationDelay: '160ms' }}
          />
          <span
            className="widget-dot !bg-slate-400 !w-[5px] !h-[5px]"
            style={{ animationDelay: '320ms' }}
          />
        </div>
      </div>
    </div>
  )
}
