import SubsTableItem from "@/components/adminComponents/SubsTableItem";
import axios from "axios";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

const Page = async () => {

  let res = await axios.get("/api/email")
   
  const handleDelete = async (mongoId: number) => {
    const response = await axios.delete("/api/email", {
      params: {
        id: mongoId
      }
    })

    if(response.data.success){
      toast.success(response.data.msg)
      res = res.data.filer((sub: Email) => sub._id !== mongoId)
    }else{
      toast.error("Error")
    }
  }


  if(!res.data) notFound()

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
            {res.data.map((email: Email) => (
              <SubsTableItem key={email._id} email={email.email} date={email.date} mongoId={email._id} handleDelete={handleDelete}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
