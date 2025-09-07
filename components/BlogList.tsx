'use client';

import React, { useState } from 'react'
import BlogItem from './BlogItem'

const BlogList = () => {

    const [menu, SetMenu] = useState<string>("All")

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button onClick={() => SetMenu("All")} className={`${menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}`}>All</button>
        <button onClick={() => SetMenu("Technology")}>Technology</button>
        <button onClick={() => SetMenu("Startup")}>Startup</button>
        <button onClick={() => SetMenu("Lifestyle")}>Lifestyle</button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blog_data.filter(item => menu === "All" ? true : item.category === menu).map((blog) => (
            <BlogItem key={blog.id} {...blog} />
        ))}
      </div>

    </div>
  )
}

export default BlogList
