// 'use client'

"use client";

import { GetFromatterForCurrency } from "@/lib/DateCreate";
import { Period, Timeframe } from "@/lib/types";
import { UserSettings } from "@prisma/client";
import React, { FC, useMemo, useState } from "react";
import HistoryPeriodSelector from "./HistoryPeriodSelector";
import { useQuery } from "@tanstack/react-query";
import { CustomTooltip } from "./Tooltip/CustomTooltip";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../ui/card";

interface MainHistoryProps {
  usersettings?: UserSettings;
}

const MainHistory: FC<MainHistoryProps> = ({ usersettings }) => {
  const currency = usersettings?.currency ?? "INR";

  const [timeframe, setTimeframe] = useState<Timeframe>("month");
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const formMatter = useMemo(
    () => GetFromatterForCurrency(currency),
    [currency],
  );

  const historyDataQuery = useQuery({
    queryKey: ["overview", "history", timeframe, period],
    queryFn: async () => {
      const response = await fetch(
        `/api/MainHIstory/HistoryData?timeframe=${timeframe}&year=${period.year}&month=${period.month}`,
      );
      if (!response.ok) {
        throw new Error("error in api/mainhistory/Historydata");
      }
      return response.json();
    },
  });

  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0;

  return (
    <>
      <h2 className="text-4xl text-white text-center my-3">History</h2>
      <div className="flex flex-col max-w-full w-full bg-black text-red-900 border p-4">
        <HistoryPeriodSelector
          period={period}
          setperiod={setPeriod}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
        <div className="max-w-full w-full mt-3">
          {dataAvailable && (
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart
                height={300}
                data={historyDataQuery.data}
                barCategoryGap={5}
              >
                <defs>
                  <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={"0"} stopColor="#10b981" stopOpacity={"1"} />
                    <stop offset={"1"} stopColor="#10b981" stopOpacity={"0"} />
                  </linearGradient>

                  <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={"0"} stopColor="#ef4444" stopOpacity={"1"} />
                    <stop offset={"1"} stopColor="#ef4444" stopOpacity={"0"} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="5 5"
                  strokeOpacity={"0.2"}
                  vertical={false}
                />
                <XAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 5, right: 5 }}
                  dataKey={(data) => {
                    const { year, month, day } = data;
                    const date = new Date(year, month, day || 1);
                    if (timeframe === "year") {
                      return date.toLocaleDateString("default", {
                        month: "long",
                      });
                    }
                    return date.toLocaleDateString("default", {
                      day: "2-digit",
                    });
                  }}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar
                  dataKey={"income"}
                  label="Income"
                  fill="url(#incomeBar)"
                  radius={4}
                  className="cursor-pointer"
                />
                <Bar
                  dataKey={"expense"}
                  label="Expense"
                  fill="url(#expenseBar)"
                  radius={4}
                  className="cursor-pointer"
                />
                <Tooltip
                  cursor={{ opacity: 0.1 }}
                  content={(props) => (
                    <CustomTooltip formatter={formMatter} {...props} />
                  )}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
          {!dataAvailable && (
            <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
              No data for the selected period
              <p className="text-sm text-muted-foreground">
                Try selecting a different period or adding new transactions
              </p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default MainHistory;

// import { GetFromatterForCurrency } from '@/lib/DateCreate'
// import { Period, Timeframe } from '@/lib/types'
// import { UserSettings } from '@prisma/client'
// import React, { FC, useMemo, useState } from 'react'
// import HistoryPeriodSelector from './HistoryPeriodSelector'
// import { useQuery } from '@tanstack/react-query'
// import {CustomTooltip} from './Tooltip/CustomTooltip'
// import {
//     Bar,
//     BarChart,
//     CartesianGrid,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis,
//   } from "recharts";
// import { Card } from '../ui/card'
// interface MainHistoryProps{
//     usersettings?:UserSettings
// }
// const MainHistory:FC<MainHistoryProps> = ({usersettings}) => {
//     const currency=usersettings?.currency ?? "INR"

//     const [timeframe,setTimeframe]=useState<Timeframe>("month")
//     const [period,setPeriod]=useState<Period>({
//         month: new Date().getMonth(),
//         year:new Date().getFullYear()
//     })
//     const formMatter=useMemo(()=>{
//         return GetFromatterForCurrency(currency)
//     },[currency])
//     console.log(period)
//     const historyDataQuery=useQuery({
//         queryKey:["overview","history",timeframe,period],
//         queryFn:async()=>{
//             const response=await fetch(`/api/MainHIstory/HistoryData?timeframe=${timeframe}&year=${period.year}&month=${period.month}`)
//             if(!response.ok){
//                 throw new Error("error in api/mainhistory/Historydata")
//             }
//             return response.json()
//         }
//     })
//     const dataAvailable=historyDataQuery.data && historyDataQuery.data.length>0;

//   return (
// <>
// <h2 className='text-4xl text-white text-center my-3'>History</h2>
// <div className='flex flex-col max-w-full w-full bg-black text-red-900 border p-4'>
// <HistoryPeriodSelector  period={period} setperiod={setPeriod} timeframe={timeframe} setTimeframe={setTimeframe}/>
// <div className='max-w-full w-full mt-3'>
// {dataAvailable && (
//               <ResponsiveContainer width={"100%"} height={300}>
//                 <BarChart
//                   height={300}
//                   data={historyDataQuery.data}
//                   barCategoryGap={5}
//                 >
//                   <defs>
//                     <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
//                       <stop
//                         offset={"0"}
//                         stopColor="#10b981"
//                         stopOpacity={"1"}
//                       />
//                       <stop
//                         offset={"1"}
//                         stopColor="#10b981"
//                         stopOpacity={"0"}
//                       />
//                     </linearGradient>

//                     <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
//                       <stop
//                         offset={"0"}
//                         stopColor="#ef4444"
//                         stopOpacity={"1"}
//                       />
//                       <stop
//                         offset={"1"}
//                         stopColor="#ef4444"
//                         stopOpacity={"0"}
//                       />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid
//                     strokeDasharray="5 5"
//                     strokeOpacity={"0.2"}
//                     vertical={false}
//                   />
//                   <XAxis
//                     stroke="#888888"
//                     fontSize={12}
//                     tickLine={false}
//                     axisLine={false}
//                     padding={{ left: 5, right: 5 }}
//                     dataKey={(data) => {
//                       const { year, month, day } = data;
//                       const date = new Date(year, month, day || 1);
//                       if (timeframe === "year") {
//                         return date.toLocaleDateString("default", {
//                           month: "long",
//                         });
//                       }
//                       return date.toLocaleDateString("default", {
//                         day: "2-digit",
//                       });
//                     }}
//                   />
//                   <YAxis
//                     stroke="#888888"
//                     fontSize={12}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Bar
//                     dataKey={"income"}
//                     label="Income"
//                     fill="url(#incomeBar)"
//                     radius={4}
//                     className="cursor-pointer"
//                   />
//                   <Bar
//                     dataKey={"expense"}
//                     label="Expense"
//                     fill="url(#expenseBar)"
//                     radius={4}
//                     className="cursor-pointer"
//                   />
//                   <Tooltip
//                     cursor={{ opacity: 0.1 }}
//                     content={(props) => (
//                       <CustomTooltip formatter={formMatter} {...props} />
//                     )}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             )}
//             {!dataAvailable && (
//               <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
//                 No data for the selected period
//                 <p className="text-sm text-muted-foreground">
//                   Try selecting a different period or adding new transactions
//                 </p>
//               </Card>
//             )}
// </div>
// </div>
// </>
//   )
// }

// export default MainHistory
