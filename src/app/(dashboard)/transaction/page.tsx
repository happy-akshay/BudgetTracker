"use client";
import { MaxDays } from "@/lib/Max-days";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";
import TransactionTable from "@/components/Dialogbox/TransactionTable";

function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Transactions history</p>
          </div>
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              // We update the date range only if both dates are set

              if (!from || !to) return;
              if (differenceInDays(to, from) > MaxDays) {
                toast.error(
                  `The selected date range is too big. Max allowed range is ${MaxDays} days!`
                );
                return;
              }

              setDateRange({ from, to });
            }}
          />
        </div>
      </div>
      <div className="container bg-black">
        <TransactionTable from={dateRange.from} to={dateRange.to} />
      </div>
    </>
  );
}

export default TransactionsPage;
