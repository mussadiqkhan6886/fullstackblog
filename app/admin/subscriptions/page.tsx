'use client';

import SubsTableItem from "@/components/adminComponents/SubsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {

  const [emails, setEmails] = useState([])

  const fetchEmails = async () => {
    const res = await axios.get("/api/email")
    setEmails(res.data.emails)
  }

  useEffect(() => {
    fetchEmails()
  }, [])  

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <SubsTableItem key={index} email={email.email} date={email.date} mongoId={email._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
