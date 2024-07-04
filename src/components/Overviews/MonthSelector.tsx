import { Period } from '@/lib/types'
import React, { FC } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
interface MonthSelctorProps{
    period:Period;
    setperiod:(period:Period)=>void;
}
const MonthSelector:FC<MonthSelctorProps> = ({period,setperiod}) => {
  return (
<>
      <div  className="max-w-[180px] w-full">
  <Select value={period.month.toString()} onValueChange={(value)=>{
    setperiod({
      month:period.month,
      year:parseInt(value)
    })
  }} >
    <SelectTrigger className='max-w-[180px] w-full'>
    <SelectValue/>
    </SelectTrigger>
    <SelectContent className='text-black'>
      {[1,2,3,4,5,6,7,8,9,10,11].map((month)=>{
        const monthStr=new Date(period.year,month,1).toLocaleString(
            "default",
            {month:"long"}
        );
        return (
        <SelectItem key={month} value={month.toString()}>{monthStr}</SelectItem>
    )
})}
    </SelectContent>
    </Select>
    </div>
    </>
  )
}

export default MonthSelector
