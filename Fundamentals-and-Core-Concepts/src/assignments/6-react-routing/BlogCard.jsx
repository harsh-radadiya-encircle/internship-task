import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, content, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      <div className="p-6">

        <Link
          to={`/blog/${id}`}
          className="text-2xl font-bold text-blue-600 hover:underline"
        >
          {title}
        </Link>

        <p className="text-gray-600 leading-relaxed my-4">
          {content}
        </p>

        <button
          onClick={onDelete}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Delete Post
        </button>

      </div>
    </div>
  );
};

export default BlogCard;