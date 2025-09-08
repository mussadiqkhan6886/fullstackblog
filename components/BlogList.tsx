'use client';

import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {

    const [menu, SetMenu] = useState<string>("All")
    const [blogs, setBlogs] = useState<Data[]>([])

    const fetchBlogs = async () => {
      const response = await axios.get("/api/blog")
      setBlogs(response.data.blogs)
    }

    useEffect(() => {
      fetchBlogs()
    }, [])

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button onClick={() => SetMenu("All")} className={`${menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}`}>All</button>
        <button onClick={() => SetMenu("Technology")} className={`${menu === "Technology" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}`}>Technology</button>
        <button onClick={() => SetMenu("Startup")} className={`${menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}`}>Startup</button>
        <button onClick={() => SetMenu("Lifestyle")} className={`${menu === "Lifestyle" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}`}>Lifestyle</button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-7 mb-16 xl:mx-4">
        {blogs.filter(item => menu === "All" ? true : item.category === menu).map((blog) => (
            <BlogItem key={blog._id} {...blog} />
        ))}
      </div>

    </div>
  )
}

export default BlogList
