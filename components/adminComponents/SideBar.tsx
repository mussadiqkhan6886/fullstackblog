import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SideBar = () => {
  return (
    <header className='flex flex-col bg-slate-100'>
      <Link href={"/"} className="px-2 sm:pl-14 py-3 border border-black">
        <Image src={assets.logo} alt='logo image' width={120} height={120} />
      </Link>
      <div className="w-28 sm:w-80 h-screen relative py-12 border border-black">
        <div className='w-[50%] sm:w-[80%] absolute right-0'>
            <Link href={'/admin/addProduct'} className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000]">
                <Image src={assets.add_icon} alt="add icon" width={28} />
                <p>Add Blog</p>
            </Link>
            <Link href={'/admin/blogList'} className=" mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000]">
                <Image src={assets.blog_icon} alt="blog icon" width={28} />
                <p>Blog List</p>
            </Link>
            <Link href={'/admin/subscriptions'} className=" mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000]">
                <Image src={assets.email_icon} alt="email icon" width={28} />
                <p>Subscription</p>
            </Link>
        </div>
      </div>
    </header>
  )
}

export default SideBar
