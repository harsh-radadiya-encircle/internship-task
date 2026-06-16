import React from "react";
import { FiZap } from "react-icons/fi";

/* STREAMING_CHUNK:Defining the memoized component */
const Child = React.memo(({ onClick }) => {
  console.log("Child Rendered");

  return (
    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 mt-4 max-w-sm w-full">
      <h2 className="text-lg font-bold text-slate-800 mb-2">
        Child Component
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        This component is memoized to prevent unnecessary re-renders.
      </p>

      {}
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-semibold px-4 py-3 rounded-2xl hover:bg-indigo-600 transition-all duration-200 active:scale-95 shadow-sm shadow-slate-200"
      >
        <FiZap size={18} />
        <span>Action Trigger</span>
      </button>
    </div>
  );
});

export default Child;