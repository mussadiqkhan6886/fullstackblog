import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const GetStarted = () => {
  return (
    <div className='flex justify-center items-baseline-last'>
        <Link href={"/"}>
          <Image src={assets.logo} width={180} height={180} className='w-[130px] sm:w-auto' alt='logo image' />
        </Link>
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black border-solid shadow-[-7px_7px_0px_#000]">Get Started <Image src={assets.arrow} alt='arrow icon button' width={50} height={50} /></button>
    </div>
  )
}

export default GetStarted
