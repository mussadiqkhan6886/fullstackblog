import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { assets } from '@/assets/assets'

const GetStarted = () => {
  return (
    <div className='flex justify-between items-center'>
        <Link href={"/"}>
          <Image src={assets.logo} width={130} height={130} className='w-[130px] sm:w-auto' alt='logo image' />
        </Link>
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black border-solid shadow-[-7px_7px_0px_#000]">Get Started <Image src={assets.arrow} alt='arrow icon button' width={20} height={20} /></button>
    </div>
  )
}

export default GetStarted
