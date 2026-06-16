import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const assignments = [
    {
      title: "8. Context API",
      path: "/context-api",
    },
    {
      title: "9. Custom Hooks",
      path: "/custom-hooks",
    },
    {
      title: "10. Redux Toolkit Basics",
      path: "/redux-toolkit-basics",
    },
    {
      title: "11. Redux Toolkit Async Thunk",
      path: "/async-thunk",
    },
    {
      title: "12. Performance Optimization",
      path: "/performance-optimization",
    },
    {
      title: "13. Formik + Yup",
      path: "/formik-yup",
    },
    {
      title: "14. Advanced Routing & Code Splitting",
      path: "/product/1",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Advanced Concepts & Professional Tools
      </h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">

        {assignments.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-lg font-semibold text-indigo-600"
          >
            {item.title}
          </Link>
        ))}

      </div>

    </div>
  );
}

export default Home;