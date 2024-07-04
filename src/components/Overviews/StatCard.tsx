import React, { FC, ReactNode, useCallback } from 'react'
import CountUp from "react-countup"
interface StatCardProps{
    formmatter:Intl.NumberFormat
    value:number
    title:string;
    Icon:ReactNode
  
}
const StatCard:FC<StatCardProps> = ({formmatter,title,value,Icon}) => {
    const formatFn=useCallback((value:number)=>{
        return formmatter.format(value)
    },[formmatter])
  return (
<>
<div className='w-[90%] flex gap-4 pl-2 border-[2px]  bg-[#007FFF] border-amber-400 mt-6 h-24 items-center sm:justify-start justify-center'>
    <div>
        {Icon}
    </div>
    <div className='flex flex-col text-white text-2xl'>
<p>{title}</p>
<CountUp preserveValue redraw={false} end={value} decimals={2} formattingFn={formatFn} className='text-2xl'/>
    </div>
</div>
</>
  )
}

export default StatCard
