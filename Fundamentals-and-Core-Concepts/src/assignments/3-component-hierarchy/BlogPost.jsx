import React, { useState } from "react";
import BlogCard from "./BlogCard";

export const BlogPost = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "React Basics",
      content: "Learn the fundamentals of React and component-based architecture.",
    },
    {
      id: 2,
      title: "Tailwind CSS",
      content: "Build beautiful and responsive UIs using utility-first CSS.",
    },
    {
      id: 3,
      title: "Props & State",
      content: "Understand how data flows through React applications.",
    },
  ]);

  const deleteData = (id) => {
    const updatedData = data.filter(
      (item) => item.id !== id
    );

    setData(updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          📝 Blog Posts
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <BlogCard
              key={item.id}
              title={item.title}
              content={item.content}
              onDelete={() => deleteData(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};