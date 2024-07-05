import Dialogbox from "@/components/Dialogbox/Dialogbox";
import DialogButtons from "@/components/Dialogbox/Dialogbutton";
import Loadings from "@/components/Loadings";
import MainHistory from "@/components/Overviews/MainHistory";
import Overview from "@/components/Overviews/Overview";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { UserSettings } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const usersettings = await prisma.userSettings.findUnique({
    where: {
      userId: user?.id
    }
  });

  if (!usersettings) {
    redirect("/wizard");
    return <Loadings />;
  }

  return (
    <>
      <Wrapper>
        <div className="flex text-white mt-5 items-center">
          <h2 className="sm:text-3xl text-xl flex-1">
            Hello <span className="capitalize">{user?.firstName}</span>
          </h2>
          <div className="flex gap-3">
            <Dialogbox types="income">
              <Button>Income</Button>
            </Dialogbox>
            <Dialogbox types="expense">
              <Button>Expense</Button>
            </Dialogbox>
            {/* <DialogButtons/> */}
          </div>
        </div>
        <div>
          <Overview usersettings={usersettings || undefined} />
        </div>
        <div className="mt-6">
          <MainHistory usersettings={usersettings || undefined} />
        </div>
      </Wrapper>
    </>
  );
};

export default Dashboard;
