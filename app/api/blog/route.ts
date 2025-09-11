import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
import fs from "fs";

const loadDB = async () => {
  await connectDB();
};
await loadDB();

// ----------------- GET -----------------
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog, { status: 200 });
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json(blogs, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

// ----------------- POST -----------------
export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image || typeof image === "string") {
      return NextResponse.json(
        { message: "Invalid image upload" },
        { status: 400 }
      );
    }

    const timeStamp = Date.now();
    const imageByte = await image.arrayBuffer();
    const buffer = Buffer.from(imageByte);
    const path = `./public/${timeStamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timeStamp}_${image.name}`;

    const blogData = {
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      category: String(formData.get("category")),
      author: String(formData.get("author")),
      authorImg: String(formData.get("authorImg")),
      image: imgUrl,
    };

    const newBlog = await BlogModel.create(blogData);

    return NextResponse.json(
      { success: true, msg: "Blog Added", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
};

// ----------------- DELETE -----------------
export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ msg: "Blog ID required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    // delete file if exists
    if (blog.image) {
      fs.unlink(`./public${blog.image}`, () => {});
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog Deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
};

// ----------------- PUT (Update) -----------------
export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ msg: "Blog ID required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    const formData = await req.formData();

    let imgUrl = blog.image; // keep old image unless replaced
    const newImage = formData.get("image");

    if (newImage && typeof newImage !== "string") {
      // delete old file if exists
      if (blog.image) {
        fs.unlink(`./public${blog.image}`, () => {});
      }

      const timeStamp = Date.now();
      const imageByte = await newImage.arrayBuffer();
      const buffer = Buffer.from(imageByte);
      const path = `./public/${timeStamp}_${newImage.name}`;
      await writeFile(path, buffer);
      imgUrl = `/${timeStamp}_${newImage.name}`;
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      {
        title: String(formData.get("title")),
        description: String(formData.get("description")),
        category: String(formData.get("category")),
        author: String(formData.get("author")),
        authorImg: String(formData.get("authorImg")),
        image: imgUrl,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      msg: "Blog Updated",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
  }
};
