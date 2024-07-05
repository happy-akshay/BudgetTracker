import Header from "@/components/Header/Header";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#004DD7] h-full w-full">
      <Header />
      {children}
    </div>
  );
}

export default layout;
