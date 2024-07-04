'use server'
import { prisma } from "@/lib/prisma";
import { TransactionSchema, TransactionSchemaType } from "@/schema/TransactionSchema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(form:TransactionSchemaType){
    console.log("first")
const parsedBody=TransactionSchema.safeParse(form);
if(!parsedBody.success){
    throw new Error(parsedBody.error.message)
}
const user=await currentUser()
if(!user){
    redirect("/sign-in")
}
console.log("1")
const {amount,category,date,description,type}=parsedBody.data
const categoryRow=await prisma.category.findFirst({
    where:{
        userId:user.id,
        name:category
    }
})

if(!categoryRow){
    throw new Error("Category not Found")
}
 return await prisma.$transaction([
 prisma.transaction.create({
    data:{
        userId:user.id,
        amount:amount,
        date:date,
        description:description || "",
        type,
        category:categoryRow.name,
        categoryIcon:categoryRow.icon,
    }
    }),
    ////update aggerates tables
prisma.monthHistory.upsert({
    where:{
        day_month_year_userId:{
            userId:user.id,
            day:date.getUTCDate(),
            month:date.getUTCMonth(),
            year:date.getUTCFullYear(),
        },

    },
    create:{
        userId:user.id,
        day:date.getUTCDate(),
        month:date.getUTCMonth(),
        year:date.getUTCFullYear(),
        expense:type==="expense" ? amount:0,
        income:type==="income" ? amount:0,
    },
    update:{
        expense:{
            increment:type==='expense'?amount:0,
        },
        income:{
            increment:type==="income"?amount : 0,
        }
    }
}),

//// update Year Aggregrate
prisma.yearHistory.upsert({
    where:{
        month_year_userId:{
            userId:user.id,
           
            month:date.getUTCMonth(),
            year:date.getUTCFullYear(),
        },

    },
    create:{
        userId:user.id,
        month:date.getUTCMonth(),
        year:date.getUTCFullYear(),
        expense:type==="expense" ? amount:0,
        income:type==="income" ? amount:0,
    },
    update:{
        expense:{
            increment:type==='expense'?amount:0,
        },
        income:{
            increment:type==="income"?amount : 0,
        }
    }
}),

])

}