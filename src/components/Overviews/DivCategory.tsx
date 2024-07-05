import { GetCategoryDivideType } from "@/app/api/divide/categoriesdivide/route";
import { accounts } from "@/lib/types";
import React, { FC } from "react";
import { Progress } from "../ui/progress";
interface DivCategoryProps {
  type: accounts;
  formmatter: Intl.NumberFormat;
  data: GetCategoryDivideType;
}
const DivCategory: FC<DivCategoryProps> = ({ type, formmatter, data }) => {
  const filterData = data?.filter((el) => el.type === type);
  const total = filterData.reduce((acc, el) => acc + (el._sum?.amount || 0), 0);

  return (
    <>
      <div className="border-[2px] sm:w-[50%] w-full max-w-full px-4 min-h-40 h-full py-5 bg-[#007FFF] ">
        <h1 className="capitalize text-2xl text-white text-center">
          {`${type} By Category`}
        </h1>
        {filterData.length > 0 && (
          <div className="mt-4 ">
            {filterData.map((item) => {
              const amount = item._sum.amount || 0;
              const percentage = (amount * 100) / (total || amount);
              return (
                <div key={item.category}>
                  <div className="flex justify-between items-center gap-2 text-white text-xl capitalize">
                    <div>
                      {item.categoryIcon}{" "}
                      <span className="mx-2">{item.category}</span>(
                      {percentage.toFixed(0)}%)
                    </div>
                    <div>{formmatter.format(amount)}</div>
                  </div>
                  <div className="my-2">
                    <Progress
                      value={percentage}
                      indicator={
                        type === "income" ? "bg-emerald-500" : "bg-rose-400"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default DivCategory;
