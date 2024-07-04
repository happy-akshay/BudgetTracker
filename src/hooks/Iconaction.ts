'use server'
import { prisma } from "@/lib/prisma";
import { CategorySchema, CategorySchemaType, DeleteCategorySchema, DeleteCategorySchemaType } from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function IconAction(form:CategorySchemaType) {
    console.log("iconaction")
  const parsedBody = CategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { name, icon, type } = parsedBody.data;
  console.log("last")
  return await prisma.category.create({
    data: {
      userId: user.id,
      name:name,
      icon:icon,
      type:type,
    },
  });
}




export async function DeleteCategory(form: DeleteCategorySchemaType) {
  const parsedBody = DeleteCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return await prisma.category.delete({
    where: {
      name_userId_type: {
        userId: user.id,
        name: parsedBody.data.name,
        type: parsedBody.data.type,
      },
    },
  });
}