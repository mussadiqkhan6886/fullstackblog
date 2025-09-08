import React from 'react'

type Props = {
    email: string
    mongoId: number
    date: number
    handleDelete: (mongoId: number) => void
}

const SubsTableItem = ({email, mongoId, date, handleDelete}: Props) => {

    const emailDate = new Date(date)

  return (
    <tr className='bg-white border-b text-left '>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email ? email : "No Email"}
      </th>
      <td className='px-6 py-4 hidden sm:block'>{emailDate}</td>
      <td onClick={() => handleDelete(mongoId)} className='px-6 py-4 cursor-pointer'>x</td>
    </tr>
  )
}

export default SubsTableItem
