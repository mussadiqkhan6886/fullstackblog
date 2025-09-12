'use client';

import SubsTableItem from "@/components/adminComponents/SubsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Email = {
  _id: number;
  email: string;
  date: number;
};

type EmailResponse = {
  emails: Email[];
};

const Page = () => {
  const [data, setData] = useState<EmailResponse | null>(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/email");
      setData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch emails");
    }
  };

  const handleDelete = async (mongoId: number) => {
    try {
      const response = await axios.delete("http://localhost:3000/api/email", {
        params: { id: mongoId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        // remove deleted email from state without reloading
        setData((prev) =>
          prev ? { emails: prev.emails.filter((e) => e._id !== mongoId) } : prev
        );
      } else {
        toast.error("Error deleting email");
      }
    } catch (err) {
      console.error(err);
      toast.error("Request failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div>Not found</div>;

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-xl font-bold">All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.emails.map((email) => (
              <SubsTableItem
                key={email._id}
                email={email.email}
                date={email.date}
                mongoId={email._id}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
