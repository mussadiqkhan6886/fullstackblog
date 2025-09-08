import Image from 'next/image'
import React from 'react'
import { assets } from '@/assets/assets'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
      <Image src={assets.logo_light} alt='footer logo image' width={120} />
      <p className='text-sm text-white'>All right reserved. &copy; Copyright 2025</p>
      <div className="flex">
        <Image src={assets.facebook_icon} width={40} height={40} alt='facebook icon' />
        <Image src={assets.twitter_icon} width={40} height={40} alt='twitter icon' />
        <Image src={assets.googleplus_icon} width={40} height={40} alt='google plus icon' />
      </div>
    </div>
  )
}

export default Footer
