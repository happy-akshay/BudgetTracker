import { GetHistoryPeriodsResponseType } from '@/app/api/MainHIstory/HIstory/route';
import { Period } from '@/lib/types'
import React, { FC } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
interface YearSelectorProps{
    period:Period;
    setperiod:(period:Period)=>void;
    years:GetHistoryPeriodsResponseType
}
const YearSelector:FC<YearSelectorProps> = ({
    period,setperiod,years
}) => {
  return (
<>
<div  className="max-w-[180px] w-full">
  <Select value={period.year.toString()} onValueChange={(value)=>{
    setperiod({
      month:period.month,
      year:parseInt(value)
    })
  }} >
    <SelectTrigger className='max-w-[180px] w-full'>
    <SelectValue/>
    </SelectTrigger>
    <SelectContent className='text-black'>
      {years.map((year)=>(
        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
      ))}
    </SelectContent>
    </Select>
</div>
</>
  )
}

export default YearSelector
