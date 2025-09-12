'use client';

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [fetchData, setFetchData] = useState<Data | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "startup",
    author: "",
    authorImg: "/profile_icon.png",
  });
  const router = useRouter()

  // fetch blog details
  const fetchBlog = async () => {
    try {
      const id = (await params).id
      const res = await axios.get("/api/blog", {
        params: { id },
      });
      setFetchData(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blog");
    }
  };

  // set form data when blog is fetched
  useEffect(() => {
    if (fetchData) {
      setData({
        title: fetchData.title,
        description: fetchData.description,
        category: fetchData.category,
        author: fetchData.author,
        authorImg: "/profile_icon.png",
      });
    }
  }, [fetchData]);


  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fetchData) return <div>Not found</div>;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("author", data.author);
  formData.append("authorImg", data.authorImg);
  if (image) formData.append("image", image);

  try {
    const id = (await params).id; // unwrap params
    const res = await axios.put(`/api/blog?id=${id}`, formData);
    if (res.data.success) {
      toast.success(res.data.msg);
      setImage(null);
      router.push("/")
    } else {
      toast.error("Error updating blog");
    }
  } catch (err) {
    toast.error("Request failed");
    console.error(err);
  }
};


  return (
    <form
      onSubmit={onSubmitHandler}
      className="pt-5 px-5 sm:pt-12 sm:pl-16"
    >
      <p className="text-xl">Upload thumbnail:</p>
      <label htmlFor="image">
        <Image
          src={!image ? fetchData.image : URL.createObjectURL(image)}
          alt="upload icon"
          width={140}
          height={140}
          className="mt-4"
        />
      </label>
      <input
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
        type="file"
        id="image"
        hidden
      />

      <p className="text-xl mt-4">Blog Title:</p>
      <input
        name="title"
        onChange={handleChange}
        value={data.title}
        type="text"
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Blog title"
      />

      <p className="text-xl mt-4">Blog Description:</p>
      <textarea
        name="description"
        onChange={handleChange}
        value={data.description}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Blog Description"
      />

      <p className="text-xl mt-4">Blog Category</p>
      <select
        value={data.category}
        onChange={handleChange}
        name="category"
        className="w-40 mt-4 px-3 py-4 border text-gray-500"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />
      <button
        type="submit"
        className="mt-8 w-40 h-12 bg-black text-white"
      >
        Update
      </button>
    </form>
  );
};

export default Page;
