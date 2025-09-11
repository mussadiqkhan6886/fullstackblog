import Footer from '@/components/Footer';
import GetStarted from '@/components/GetStarted';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import axios from 'axios';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { id } = params; // plain object, no warning
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog?id=${id}`);
  const blog = response.data;

  if (!blog) return notFound();

  return (
    <>
      <main>
        <section className="bg-gray-200 py-5 px-5 md:px-12 lg:pz-28">
          <GetStarted />
          <div className="text-center my-24">
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{blog.title}</h1>
            <Image priority src={blog.authorImg} alt="author image" width={60} height={60} className="mx-auto mt-6 border border-white rounded-full" />
            <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{blog.author}</p>
          </div>
        </section>
        <article className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
          <Image src={blog.image} width={1280} height={720} alt="poster hero image" />
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.description }} />
          <div className="my-24">
            <p className="text-black font-semibold my-4">Share this article on social media</p>
            <div className="flex">
              <Image src={assets.facebook_icon} width={50} height={50} alt="facebook icon" />
              <Image src={assets.twitter_icon} width={50} height={50} alt="twitter icon" />
              <Image src={assets.googleplus_icon} width={50} height={50} alt="google plus icon" />
            </div>
          </div>
        </article>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Page;
