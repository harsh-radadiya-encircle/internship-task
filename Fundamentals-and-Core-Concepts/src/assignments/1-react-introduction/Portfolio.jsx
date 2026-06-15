import React from "react";

function Portfolio({ bio }) {
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
      
      <img
        src="photo.jpeg"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200"
      />

      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        Harsh Radadiya
      </h2>

      <h3 className="text-gray-500 text-sm mt-1">
        MERN Stack Developer
      </h3>

      <p className="mt-4 text-gray-600">
        {bio}
      </p>

    </div>
  );
}

export default Portfolio;