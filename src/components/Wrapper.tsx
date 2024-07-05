import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";

interface wrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper: FC<wrapperProps> = ({ className, children }) => {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-[1240px] px-2.5 md:px-5",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
