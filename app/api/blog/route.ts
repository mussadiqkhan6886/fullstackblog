import { connectDB } from "@/lib/config/db"
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import BlogModel from "@/lib/models/BlogModel"
const fs = require("fs")
 
const loadDB = async () => {
    await connectDB()
}

await loadDB()

export const GET = async (req: Request) => {
  try {
    // Access query params from request URL
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ blog });
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

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


export const DELETE = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const id = await searchParams.get("id")
    const blog = await BlogModel.findById(id)
    fs.unlink(`./public${blog.image}`, () => {})
    await BlogModel.findByIdAndDelete(id)
    return NextResponse.json({msg: "Blog Deleted"})
}
