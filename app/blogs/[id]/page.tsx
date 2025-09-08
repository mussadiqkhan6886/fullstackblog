'use client';

import Footer from '@/components/Footer';
import GetStarted from '@/components/GetStarted';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react'
import { assets } from '@/assets/assets';
import axios from 'axios';
import { notFound } from 'next/navigation';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)

    const [data, setData] = useState<Data | null>(null)

    const fetchBlogs = async () => {
      const response = await axios.get('/api/blog', {
        params: {
          id: id
        }
      })
      setData(response.data)
    }

    useEffect(() => {
      fetchBlogs()
    }, [id, fetchBlogs])

    if(!data) notFound()

  return (
    <>
    <main>
    <section className='bg-gray-200 py-5 px-5 md:px-12 lg:pz-28'>
      <GetStarted />
      <div className="text-center my-24">
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
        <Image priority={true} src={data.authorimg} alt='author image' width={60} height={60} className='mx-auto mt-6 border border-white rounded-full' />
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
      </div>
    </section>
    <article className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image src={data.image} width={1280} height={720} alt={"poster hero image"} />
        <div className='blog-content' dangerouslySetInnerHTML={{__html: data.description}}>

        </div>
        <div className='my-24'>
            <p className='text-black font-semibold my-4'>Share this article on social media</p>
            <div className="flex">
                <Image src={assets.facebook_icon} width={50} height={50} alt='facebook icon' />
                <Image src={assets.twitter_icon} width={50} height={50} alt='twitter icon' />
                <Image src={assets.googleplus_icon} width={50} height={50} alt='google plus icon' />
            </div>
        </div>
    </article>
    </main>
    <footer>
        <Footer />
    </footer>
    </>
  )
}

export default Page
 