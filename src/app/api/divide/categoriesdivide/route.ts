import { prisma } from "@/lib/prisma";
import { OverviewDateSchema } from "@/schema/DateSchema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  console.log("first categorydivide");
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  console.log("second categorydivide");
  const queryParams = OverviewDateSchema.safeParse({ from, to });
  if (!queryParams.success) {
    return Response.json(
      { message: "category/divide not work route" },
      { status: 400 },
    );
  }
  console.log("forth categorydivide");
  const stats = await getCategoryDivide(
    user.id,
    queryParams.data.from,
    queryParams.data.to,
  );
  console.log("category divide stats");
  return Response.json(stats);
}
export type GetCategoryDivideType = Awaited<
  ReturnType<typeof getCategoryDivide>
>;
async function getCategoryDivide(userId: string, from: Date, to: Date) {
  const stats = await prisma.transaction.groupBy({
    by: ["type", "category", "categoryIcon"],
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
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });
  return stats;
}
