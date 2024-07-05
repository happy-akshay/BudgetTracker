import React from "react";
import Logo from "../Logo";
import HeaderItem from "./HeaderItem";
import { UserButton } from "@clerk/nextjs";
import Wrapper from "../Wrapper";

const Header = () => {
  return (
    <>
      <Wrapper className="sm:bg-black bg-white">
        <div className="flex justify-between items-center w-full sm:h-[80px] h-[70px]">
          <div>
            <Logo />
          </div>
          <div>
            <HeaderItem />
          </div>
          <div className="hidden sm:block">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Header;
