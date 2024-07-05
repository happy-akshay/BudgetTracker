import Logo from "@/components/Logo";
import React, { FC, ReactNode } from "react";

interface layoutprops {
  children: ReactNode;
}

const layout: FC<layoutprops> = ({ children }) => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center h-screen">
        <Logo />
        <div className="mt-5">{children}</div>
      </div>
    </>
  );
};

export default layout;
