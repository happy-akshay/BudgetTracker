import { Period, Timeframe } from "@/lib/types";
import React, { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { GetHistoryPeriodsResponseType } from "@/app/api/MainHIstory/HIstory/route";
import YearSelector from "./YearSelector";
import MonthSelector from "./MonthSelector";
interface HistoryPeriodSelectorProps {
  period: Period;
  setperiod: (period: Period) => void;
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
}
const HistoryPeriodSelector: FC<HistoryPeriodSelectorProps> = ({
  period,
  setTimeframe,
  setperiod,
  timeframe,
}) => {
  const historyPeriods = useQuery<GetHistoryPeriodsResponseType>({
    queryKey: ["overview", "history", "periods"],
    queryFn: async () => {
      const response = await fetch("/api/MainHIstory/HIstory");
      if (!response.ok) {
        throw new Error(" yaha par error api/mainhistory/history");
      }
      return response.json();
    },
  });

  return (
    <>
      <div className="flex gap-4">
        <Tabs
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as Timeframe)}
        >
          <TabsList>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
        <div>
          <YearSelector
            period={period}
            setperiod={setperiod}
            years={historyPeriods.data || []}
          />
        </div>
        {timeframe === "month" && (
          <MonthSelector period={period} setperiod={setperiod} />
        )}
      </div>
    </>
  );
};

export default HistoryPeriodSelector;
