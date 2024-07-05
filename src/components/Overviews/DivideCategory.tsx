import { DateCreate, GetFromatterForCurrency } from "@/lib/DateCreate";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useMemo } from "react";
import DivCategory from "./DivCategory";
import { GetCategoryDivideType } from "@/app/api/divide/categoriesdivide/route";
interface DivideCategoryProps {
  Usersettings?: UserSettings;
  from: Date;
  to: Date;
}

const DivideCategory: FC<DivideCategoryProps> = ({
  Usersettings,
  from,
  to,
}) => {
  const currency = Usersettings?.currency || "INR";
  const divideQuery = useQuery<GetCategoryDivideType>({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: async () => {
      const response = await fetch(
        `api/divide/categoriesdivide?from=${DateCreate(from)}&to=${DateCreate(to)}`
      );
      if (!response.ok) {
        throw new Error("error in api/divide/categoriesdivide");
      }
      return response.json();
    },
  });
  console.log("dividequery", divideQuery?.data);
  const formMatter = useMemo(() => {
    return GetFromatterForCurrency(currency);
  }, [Usersettings?.currency]);
  return (
    <>
      <div className="flex justify-between flex-wrap mt-6 sm:flex-nowrap gap-2">
        <DivCategory
          formmatter={formMatter}
          type="income"
          data={divideQuery.data || []}
        />
        <DivCategory
          formmatter={formMatter}
          type="expense"
          data={divideQuery.data || []}
        />
      </div>
    </>
  );
};

export default DivideCategory;
