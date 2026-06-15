import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const assignments = [
        {
            title: "1. React Introduction",
            path: "/portfolio",
        },
        {
            title: "2. State & Events",
            path: "/todo-app",
        },
        {
            title: "3. Component Hierarchy",
            path: "/blog-posts",
        },
        {
            title: "4. Forms & Input Handling",
            path: "/registration-form",
        },
        {
            title: "5. useEffect & API Integration",
            path: "/user-cards",
        },
        {
            title: "6. React Routing",
            path: "/routing-blog",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold text-center mb-10">
                React Assignments
            </h1>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">

                {assignments.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-xl font-semibold text-blue-600"
                    >
                        {item.title}
                    </Link>
                ))}

            </div>

        </div>
    );
};

export default Home;