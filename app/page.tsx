'use client';

import BlogItems from '@/components/BlogItems';
import Header from '@/components/Header'
import React from 'react'

const Home = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <BlogItems />
      </main>
    </>
  )
}

export default Home
