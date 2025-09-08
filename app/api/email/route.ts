import { connectDB } from "@/lib/config/db"
import EmailModel from "@/lib/models/EmailModel"
import { NextResponse } from "next/server"

const loadDB = async () => {
    await connectDB()
}

loadDB()

export async function GET(req: Request){
    const emails = await EmailModel.find({})
    return NextResponse.json({emails})
}

export async function POST(request: Request){
    const formData = await request.formData()
    const emailData = {
        email: `${formData.get("email")}`,
    }
    await EmailModel.create(emailData)

    return NextResponse.json({success: true, msg:"Email Subscribed"})
}

export async function DELETE(req: Request){
    const { searchParams } = new URL(req.url)
    const id = await searchParams.get("id")
    await EmailModel.findByIdAndDelete(id)
    return NextResponse.json({success: true, msg: "Email Deleted"})
}