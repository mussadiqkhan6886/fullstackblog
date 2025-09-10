'use client';

import { assets } from "@/assets/assets";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

const Page = () => {

  const [image, setImage] = useState<File | null>(null)
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Mussadiq khan",
    authorImg: "/profile_icon.png"
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {  
    setData({...data, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author', data.author)
    formData.append('authorImg', data.authorImg)
    if(image) formData.append('image', image)
    const response = await axios.post('/api/blog', formData)
    if(response.data.success){
      toast.success(response.data.message)
      setImage(null)
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Mussadiq khan",
        authorImg: "/profile_icon.png"
      })
    }else{
      toast.error("Error")
    }
  }
  
  return (
    <>
     <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 ">
        <p className="text-xl ">Upload thumbnail:</p>
        <label htmlFor="image">
          <Image src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="upload icon" width={140} height={140} className="mt-4" />
        </label>
        <input 
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }} 
          type="file" 
          id="image" 
          hidden 
          required 
        />
        <p className="text-xl mt-4">Blog Title:</p>
        <input name="title" onChange={handleChange} value={data.title} type="text" className="w-full sm:w-[500px] mt-4 px-4 py-3 border" placeholder="Blog title" />
        <p className="text-xl mt-4">Blog Description:</p>
        <textarea name="description" onChange={handleChange} value={data.description} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" placeholder="Blog Description" />
        <p className="text-xl mt-4 ">Blog Category</p>
        <select value={data.category} onChange={handleChange} name="category" className="w-40 mt-4 px-3 py-4 border text-gray-500 ">
          <option value="startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">ADD</button>
      </form> 
    </>
  )
}

export default Page
