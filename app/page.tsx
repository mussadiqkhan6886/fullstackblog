'use client';

import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';
import Header from '@/components/Header'
import React from 'react'

// axios install fix data download assets react-toastify 
// mongoose

const Home = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <BlogList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Home
