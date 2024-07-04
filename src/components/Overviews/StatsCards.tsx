'use client'
import { GetBalanceResponseType } from '@/app/api/divide/datadate/route'
import { DateCreate, GetFromatterForCurrency } from '@/lib/DateCreate'
import { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { FC, useMemo } from 'react'
import { string } from 'zod'
import StatCard from './StatCard'
import { PiggyBank, TrendingDown, TrendingDownIcon, TrendingUp } from 'lucide-react'
interface StatsCardsProps{
    Usersettings?:UserSettings,
    from:Date,
    to:Date
}

const StatsCards:FC<StatsCardsProps> = ({Usersettings,from,to}) => {
  const currency=Usersettings?.currency ?? "INR"

    const statsQuery=useQuery<GetBalanceResponseType>({
        queryKey:["overview","stats",from,to],
        queryFn:async()=>{
         const response=await fetch(`/api/divide/datadate?from=${DateCreate(from)}&to=${DateCreate(to)}`)
         if(!response.ok){
          throw new Error("error in api/divide/categoriesdivide")
         }
         return response.json()
        }
    })
    const formMatter=useMemo(()=>{
      return GetFromatterForCurrency(currency);
    },[Usersettings?.currency])
    const income=statsQuery?.data?.income || 0
    const expense=statsQuery.data?.expense || 0
    const balance =income-expense
  return (

<>
<div className='flex flex-wrap sm:flex-nowrap gap-2'>
<StatCard formmatter={formMatter} value={income} title="Income" Icon={<TrendingUp className='h-16 w-16 rounded-[20%] bg-emerald-400 border-[1px] text-white'/>}/>
<StatCard formmatter={formMatter} value={expense} title="Expense" Icon={<TrendingDownIcon className='h-16 w-16 rounded-[20%] bg-red-400 border-[1px] text-white'/>}/>
<StatCard formmatter={formMatter} value={balance} title="Balance" Icon={<PiggyBank className='h-16 w-16 rounded-[20%] bg-[#F3721B] border-[1px] text-white'/>}/>
</div>

</>
  )
}

export default StatsCards
