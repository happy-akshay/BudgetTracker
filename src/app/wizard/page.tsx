import Buttons from "@/components/Buttons/Buttons";
import Wrapper from "@/components/Wrapper";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Wizard = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <Wrapper>
        <div className="flex flex-col justify-center items-center text-white gap-8 h-screen">
          <h2 className="tracking-tighter font-bold text-4xl">
            Welcome,
            <span className="text-amber-400 ml-2">{user.firstName}</span>
          </h2>
          <p className="text-2xl block text-center">
            Please Set Your Currency{" "}
            <span className="block">
              You can change this setting at any time
            </span>{" "}
          </p>
          <div className="border border-t-4 border-gray-300" />
          <div className="max-w-[480px] w-full border-[3px] border-black rounded bg-[#007FFF] px-5 py-5 flex flex-col gap-5">
            <h3>Currency</h3>
            <p>Set your default currncy for transactions</p>
            <Buttons />
            <button className="border-[2px] border-slate-500 bg-white text-black font-serif">
              Go To The Dashboard
            </button>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Wizard;
