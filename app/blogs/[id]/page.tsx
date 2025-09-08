import { blog_data } from '@/assets/assets';
import Footer from '@/components/Footer';
import GetStarted from '@/components/GetStarted';
import Image from 'next/image';
import React, { use } from 'react'
import { assets } from '@/assets/assets';
import { notFound } from 'next/navigation';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)

    const filteredData = blog_data.find((item: Data) => item.id === parseInt(id))

    if(!filteredData) notFound()

  return (
    <>
    <main>
    <section className='bg-gray-200 py-5 px-5 md:px-12 lg:pz-28'>
      <GetStarted />
      <div className="text-center my-24">
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{filteredData.title}</h1>
        <Image priority={true} src={filteredData.author_img} alt='author image' width={60} height={60} className='mx-auto mt-6 border border-white rounded-full' />
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{filteredData.author}</p>
      </div>
    </section>
    <article className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image src={filteredData.image} width={1280} height={720} alt={"poster hero image"} />
        <h1 className='my-8 text-[26px] font-semibold'>Introduction: </h1>
        <p>{filteredData.description}</p>
        <h3 className="my-5 text-lg font-semibold">Step 1: Self</h3>
        <p className='my-3'>before</p>
        <h3 className="my-5 text-lg font-semibold">Step 1: Self</h3>
        <p className='my-3'>before</p>
        <h3 className="my-5 text-lg font-semibold">Step 1: Self</h3>
        <p className='my-3'>before</p>
        <h3 className="my-5 text-lg font-semibold">Step 1: Self</h3>
        <p className='my-3'>before</p>
        <h3 className="my-5 text-lg font-semibold">Step 1: Self</h3>
        <p className='my-3'>before</p>
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

export default page
