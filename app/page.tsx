'use client';

import BlogList from '@/components/BlogList';
import Header from '@/components/Header'
import React from 'react'

const Home = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <BlogList />
      </main>
    </>
  )
}

export default Home
