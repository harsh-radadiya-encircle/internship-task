import React from "react";

const BlogCard = ({ title, content, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      <div className="p-6">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h2>

        <p className="text-gray-600 leading-relaxed mb-5">
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