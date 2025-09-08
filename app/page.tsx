'use client';

import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';
import Header from '@/components/Header'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <>
    <ToastContainer theme="dark" />
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
