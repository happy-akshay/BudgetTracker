import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req:Request){
try {
    const user=await currentUser()
    if(!user){
        redirect('/sign-in')
    }
    let userSettings=await prisma.userSettings.findUnique({
        where:{
            userId:user.id
    }
})
    if(!userSettings){
     userSettings=await prisma.userSettings.create({
            data:{
                userId:user.id,
                currency:"INR"
            }
            })
 
        }
        revalidatePath('/')
        console.log("completed")
    return NextResponse.json(userSettings,{status:200})
} catch (error) {
    return NextResponse.json({message:"the error is api/user"},{status:500})
}


}



// npx prisma db push