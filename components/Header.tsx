import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-center items-baseline-last'>
        <Image src={} width={180} height={180} className='w-[130px] sm:w-auto' alt='logo image' />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black border-solid shadow-[-7px_7px_0px_#000]">Get Started <Image src={} alt='arrow icon button' width={50} height={50} /></button>
      </div>
      <div className="text-center my-8">
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-sm sm:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos voluptate sit labore ea error. Voluptatem officiis qui saepe, modi ipsum laudantium eligendi ratione, natus, magnam dicta debitis rem quo nobis!</p>
        <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000]'>
            <input type='email' placeholder='mussadiqkhan6886@gmail.com' className='pl-4 outline-none' />
            <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header
