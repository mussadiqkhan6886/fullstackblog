'use client';

import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {

    const [menu, SetMenu] = useState<string>("All")
    const [blogs, setBlogs] = useState<Data[]>([])

    const fetchBlogs = async () => {
      const response = await axios.get("/api/blog")
      console.log(response.data)
      setBlogs(response.data)
      // if network issue or other issue display no blogs found
      if(response.status !== 200){
        return <div>NO BLOGS FOUND</div>
      }
    }

    useEffect(() => {
      fetchBlogs()
    }, [])

    if(!blogs) (
      <div>
        NO BLOGS FOUND
      </div>
    )

  return (
    <div>
      <div className="flex justify-center gap-6 my-11">
        <button onClick={() => SetMenu("All")} className={`${menu === "All" ? "bg-black text-white rounded-sm duration-300 transition-all ease-in-out" : ""} py-1 px-4 cursor-pointer`}>All</button>
        <button onClick={() => SetMenu("Technology")} className={`${menu === "Technology" ? "bg-black text-white  rounded-sm duration-300 transition-all ease-in-out" : ""} py-1 px-4 cursor-pointer`}>Technology</button>
        <button onClick={() => SetMenu("Startup")} className={`${menu === "Startup" ? "bg-black text-white  rounded-sm duration-300 transition-all ease-in-out" : ""} py-1 px-4 cursor-pointer`}>Startup</button>
        <button onClick={() => SetMenu("Lifestyle")} className={`${menu === "Lifestyle" ? "bg-black text-white  rounded-sm duration-300 transition-all ease-in-out" : ""} py-1 px-4 cursor-pointer`}>Lifestyle</button>
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
