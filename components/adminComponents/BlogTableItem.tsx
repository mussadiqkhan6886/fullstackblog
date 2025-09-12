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
  console.log(date)
    const BlogDate = new Date(date)
  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition">
  {/* Author cell */}
  <th
    scope="row"
    className="hidden sm:flex items-center gap-3 px-6 py-4 font-medium text-gray-700 whitespace-nowrap"
  >
    <Image
      src={authorImg || "/profile_icon.png"}
      alt="profile image"
      width={40}
      height={40}
      className="rounded-full object-cover"
    />
    <p>{author || "No author"}</p>
  </th>

  {/* Title */}
  <td className="px-6 py-4 text-gray-800">
    {title || "No title"}
  </td>

  {/* Date */}
  <td className="px-6 py-4 text-gray-500">
    {BlogDate?.toDateString()}
  </td>

  {/* Actions */}
  <td className="px-6 py-4 ">
    <Link
      href={`/admin/updateProduct/${mongoId}`}
      className="text-blue-600 hover:underline mr-2 font-medium"
    >
      Update
    </Link>
    <button
      onClick={() => deleteBlog(mongoId)}
      className="text-red-600 ml-4 cursor-pointer text-xl hover:text-red-800 font-bold"
    >
      ×
    </button>
  </td>
</tr>

  )
}

export default BlogTableItem
