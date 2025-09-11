import BlogTableItem from "@/components/adminComponents/BlogTableItem";
import axios from "axios";
import {toast} from "react-toastify"

const Page = async () => {


    let response = await axios.get("/api/blog")

    const deleteBlog = async (mongoId: number) => {
        const res  = await axios.delete("/api/blog", {
            params: {
                id: mongoId
            }
        })
        toast.success(res.data.msg)
        response = response.data.filter((blog: Data) => blog._id !== mongoId)
    }


    if(!response) return <div>No Blogs found</div>

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
            <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="hidden sm:block px-6 py-3">
                        Author name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Blog Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {response.data.map((blog: Data) => (
                    <BlogTableItem key={blog._id} authorImg={blog.authorImg} title={blog.title} author={blog.author} mongoId={blog._id} date={blog.date} deleteBlog={deleteBlog} />
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
