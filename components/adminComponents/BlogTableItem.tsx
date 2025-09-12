'use client';

import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
  authorImg: string
  title: string
  author: string
  date: number
  mongoId: number
  deleteBlog: (mongoId: number) => void
}

const BlogTableItem = ({authorImg, title, author, mongoId, date, deleteBlog} : Props) => {
    const BlogDate = new Date(date)
  return (
    <tr className='bg-white border-b'>
      <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-700 text-nowrap'>
        <Image src={authorImg ? authorImg : "/profile_icon.png"} alt='profile image' width={50} height={50} />
        <p>{author ? author : "No author"}</p>
      </th>
      <td className='px-6 py-4'>
        {title ? title: "no title"}
      </td>
      <td className='px-6 py-4'>
        {BlogDate.toDateString()}
      </td>
      <td className='px-6 flex flex-row gap-5 py-4 cursor-pointer'>
        <Link href={`/admin/updateProduct/${mongoId}`}>update</Link>
        <span onClick={() => deleteBlog(mongoId)} >x</span>
      </td>
    </tr>
  )
}

export default BlogTableItem
