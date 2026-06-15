import React from "react";
import { Link, useParams } from "react-router-dom";

const blogData = [
  {
    id: 1,
    title: "React Basics",
    content:
      "Learn the fundamentals of React and component-based architecture.",
  },
  {
    id: 2,
    title: "Tailwind CSS",
    content:
      "Build beautiful and responsive UIs using utility-first CSS.",
  },
  {
    id: 3,
    title: "Props & State",
    content:
      "Understand how data flows through React applications.",
  },
];

const BlogDetail = () => {
  const { id } = useParams();

  const blog = blogData.find(
    (item) => item.id === Number(id)
  );

  if (!blog) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Blog Not Found
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full">

        <h1 className="text-4xl font-bold mb-5">
          {blog.title}
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          {blog.content}
        </p>

        <Link
          to="/"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          ← Back to Blogs
        </Link>

      </div>

    </div>
  );
};

export default BlogDetail;