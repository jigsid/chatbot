'use client'

import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'

interface AppointmentSkeletonProps {
  count?: number
}

const AppointmentSkeleton = ({ count = 3 }: AppointmentSkeletonProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
        {/* Left section - Table skeleton */}
        <div className="lg:col-span-2 overflow-y-auto">
          <Card className="rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-[150px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 py-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[130px]" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
                <Separator />
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 py-4">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right section - Today's bookings */}
        <div className="col-span-1">
          <div className="mb-4">
            <Skeleton className="h-5 w-[180px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="rounded-xl overflow-hidden mt-4">
              <CardContent className="p-0 flex">
                <div className="w-4/12 py-10 flex justify-center items-center">
                  <Skeleton className="h-6 w-[60px]" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between w-full p-3">
                    <div>
                      <Skeleton className="h-3 w-[50px] mb-1" />
                      <Skeleton className="h-3 w-[60px]" />
                    </div>
                    <div>
                      <Skeleton className="h-3 w-[50px] mb-1" />
                      <Skeleton className="h-3 w-[80px]" />
                    </div>
                  </div>
                  <Separator orientation="horizontal" />
                  <div className="w-full flex items-center p-3 gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default AppointmentSkeleton 