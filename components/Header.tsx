import React, { FormEvent, useState } from 'react'
import GetStarted from './GetStarted'
import axios from 'axios'
import { toast } from 'react-toastify'

const Header = () => {

  const [email, setEmail] = useState("")

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("email", email)
    const response = await axios.post("/api/email", formData)

    if(response.data.success){
      toast.success(response.data.msg)
      setEmail("")
    }else{
      toast.error("Error")
    }

  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <GetStarted />
      <div className="text-center my-8">
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-sm sm:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos voluptate sit labore ea error. Voluptatem officiis qui saepe, modi ipsum laudantium eligendi ratione, natus, magnam dicta debitis rem quo nobis!</p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000]'>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='mussadiqkhan6886@gmail.com' className='pl-4 outline-none w-full' />
            <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white hover:bg-gray-200 cursor-pointer'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header
