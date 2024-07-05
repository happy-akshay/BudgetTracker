"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Buttons = () => {
  const currency = [
    {
      CURRENCY: "RUPPE",
    },
    {
      CURRENCY: "DOLLAR",
    },
  ];
  const [selectedOption, setSelectedOption] = useState<string>("Rupee");
  const router = useRouter();

  const { refetch } = useQuery({
    queryKey: ["user-settings"],
    queryFn: () => fetch(`/api/user`).then((res) => res.json()),
    enabled: false, // Disable the query from automatically running
  });

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);

    // Manually trigger the query
    const result = await refetch();

    if (result.isSuccess) {
      console.log(result.data);
      // Redirect to the home page
      router.push("/");
    } else {
      console.error(result.error);
    }
  };

  return (
    <>
      <select
        className="block w-full bg-amber-400"
        onChange={handleChange}
        value={selectedOption}
      >
        <option value="">who shot first</option>
        {currency.map((item) => (
          <option key={item.CURRENCY} value={item.CURRENCY}>
            {item.CURRENCY}
          </option>
        ))}
      </select>
    </>
  );
};

export default Buttons;
