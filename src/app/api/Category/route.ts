import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sing-in");
  }
  const { searchParams } = new URL(req.url);
  const paramType = searchParams.get("type");
  const validator = z.enum(["expense", "income"]).nullable();
  const queryParams = validator.safeParse(paramType);
  if (!queryParams.success) {
    return Response.json(queryParams.error, {
      status: 400,
    });
  }
  const type = queryParams.data;

  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
      ...(type && { type }),
    },
    orderBy: {
      name: "asc",
    },
  });
  console.log("9");
  // console.log(categories)
  return Response.json(categories);
}

// ...(type && {type}), its alternative
// type:type!==null?type:undefined
// type:type||undefined
