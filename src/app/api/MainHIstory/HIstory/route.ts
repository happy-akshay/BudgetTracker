import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const periods = await getHistoryPeriod(user.id);
  return Response.json(periods);
}

export type GetHistoryPeriodsResponseType = Awaited<
  ReturnType<typeof getHistoryPeriod>
>;

async function getHistoryPeriod(userId: string) {
  const result = await prisma.monthHistory.findMany({
    where: {
      userId: userId,
    },
    select: {
      year: true,
    },
    distinct: ["year"],
    orderBy: [
      {
        year: "asc",
      },
    ],
  });
  const years = result.map((el) => el.year);
  if (years.length) {
    return [new Date().getFullYear()];
  }
  return years;
}
