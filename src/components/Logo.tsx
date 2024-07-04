import { Skull } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <>
      <Link href={"/"} className="flex items-center gap-2">
        <Skull className="w-16 h-16 sm:w-10 sm:h-10 text-green-400" />
        <p className="text-1xl sm:text-3xl tracking-tighter font-bold text-green-400">
          Budget Tracker
        </p>
      </Link>
    </>
  );
};

export default Logo;
