'use client'
import { UserSettings } from '@prisma/client'
import { differenceInDays, startOfMonth } from 'date-fns'
import React, { FC, useState } from 'react'
import { DateRangePicker } from '../ui/date-range-picker'
import { toast } from 'sonner'
import { MaxDays } from '@/lib/Max-days'
import StatsCards from './StatsCards'
import DivideCategory from './DivideCategory'

interface OverviewProps{
  usersettings?:UserSettings
}

const Overview:FC<OverviewProps> = ({usersettings}) => {
  const [dateRange,setdateRange]=useState<{from:Date; to:Date}>({
    from:startOfMonth(new Date()),to:new Date(),
  })
  return (
<>
<div className='flex justify-between mt-5 items-center'>
  <h2 className="text-white text-2xl">
    Overview
  </h2>
  <DateRangePicker
  initialDateFrom={dateRange.from}
  initialDateTo={dateRange.to}
  showCompare={false}
  onUpdate={(value)=>{
    const {from,to}=value.range
    if(!from||!to) return;
    if(differenceInDays(to,from)>MaxDays){
      toast.error(
        `The selected date range is too big. Max allowed range is ${MaxDays} days`
      );
      return 
    }
    setdateRange({from,to})
  }}
  />
</div>
<StatsCards Usersettings={usersettings || undefined} from={dateRange.from} to={dateRange.to}/>
<DivideCategory Usersettings={usersettings||undefined} from={dateRange.from} to={dateRange.to}/>
</>
  )
}

export default Overview
