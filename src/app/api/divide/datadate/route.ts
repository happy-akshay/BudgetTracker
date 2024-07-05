import { prisma } from "@/lib/prisma";
import { OverviewDateSchema } from "@/schema/DateSchema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const queryparams = OverviewDateSchema.safeParse({ from, to });

  if (!queryparams.success) {
    return Response.json(
      { message: "route datadate not work" },
      {
        status: 400,
      }
    );
  }
  const stats = await getBalanceStats(
    user.id,
    queryparams.data.from,
    queryparams.data.to
  );
  return Response.json(stats);
}

export type GetBalanceResponseType = Awaited<
  ReturnType<typeof getBalanceStats>
>;
async function getBalanceStats(userId: string, from: Date, to: Date) {
  const totals = await prisma.transaction.groupBy({
    by: ["type"],
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
  });
  return {
    expense: totals.find((t) => t.type === "expense")?._sum.amount || 0,
    income: totals.find((t) => t.type === "income")?._sum.amount || 0,
  };
}
