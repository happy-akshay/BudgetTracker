"use client";
import { dashboarditem } from "@/lib/item";
import Link from "next/link";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "../Logo";
const HeaderItem = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div>
        <div className="hidden gap-8 sm:flex">
          {dashboarditem.map((item) => (
            <div
              key={item.label}
              className="text-white tex-3xl hover:text-[#ffa500] hover:bg-gray-300"
            >
              <Link href={item.link}>
                <p>{item.label}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="block sm:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button>
                <Menu />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-black">
              <SheetHeader>
                <SheetTitle className="text-amber-400 flex justify-center w-full">
                  <Logo />
                </SheetTitle>
                <SheetTitle className="text-amber-400">
                  Your Other Profile{" "}
                </SheetTitle>
                {/* <SheetDescription>
            Your Profile
          </SheetDescription> */}
              </SheetHeader>
              <div className="flex flex-col gap-6 justify-center pt-10">
                {dashboarditem.map((item) => (
                  <div
                    key={item.label}
                    className="text-amber-400 hover:text-[#ffa500] hover:bg-gray-300 bg-white flex flex-col"
                  >
                    <Link href={item.link}>
                      <p>{item.label}</p>
                    </Link>
                  </div>
                ))}
              </div>
              <SheetFooter className="bg-white text-red">
                <SheetClose asChild className="bg-white">
                  {/* <button type="submit">Save changes</button> */}
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default HeaderItem;
