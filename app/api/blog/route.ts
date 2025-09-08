import { connectDB } from "@/lib/config/db"
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import BlogModel from "@/lib/models/BlogModel"
 
const loadDB = async () => {
    await connectDB()
}

await loadDB()

export const GET = () => {

}

export const POST = async (req: Request) => {
    const formData = await req.formData()
    const timeStamp = Date.now()
    const image = formData.get("image")
    if(!image) return NextResponse.json({"message": "No file found"}, {status: 400})
    if(typeof image === "string") return NextResponse.json({"message": "Expected file not string"}, {status: 400})
    const imageByte = await image.arrayBuffer() 
    const buffer = Buffer.from(imageByte)
    const path = `./public/${timeStamp}_${image.name}`
    await writeFile(path, buffer)
    const imgUrl =  `/${timeStamp}_${image.name}`

    const blogData = {
        title: `${formData.get("title")}`,
        description: `${formData.get("description")}`,
        category: `${formData.get("category")}`,
        author: `${formData.get("author")}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get('authorImg')}`
    }

    await BlogModel.create(blogData)

    return NextResponse.json({success: true, msg:"Blog Added"})
} 