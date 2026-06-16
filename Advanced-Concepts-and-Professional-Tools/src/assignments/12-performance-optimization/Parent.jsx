import { useState, useCallback } from "react";
import Child from "./Child";
import ExpensiveCalculation from "./ExpensiveCalculation";
import { FiBox, FiPlus } from "react-icons/fi";

function Parent() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(5);

  console.log("Parent Rendered");

  const handleClick = useCallback(() => {
    alert("Child Button Clicked");
  }, []);

  return (
    <>
      {/* Header Section */}
  <div className="text-center mb-10">
    <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
      <FiBox size={24} />
    </div>
    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-3">
      Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Optimization</span>
    </h1>
    <p className="text-sm text-slate-500 max-w-md mx-auto">
      Demonstrating React.memo and useMemo to prevent unnecessary re-renders in child components.
    </p>
  </div>

  <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-start justify-center">
    
    {/* Parent State Controls */}
    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm w-full max-w-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
        Parent Controls
      </h2>

      {/* Count State Panel */}
      <div className="bg-slate-50 p-4 rounded-2xl mb-4 flex items-center justify-between border border-slate-100">
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
            Local Count
          </span>
          <span className="text-3xl font-black text-slate-800 tabular-nums">
            {count}
          </span>
        </div>
        <button
          onClick={() => setCount(count + 1)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-sm shadow-indigo-200 font-semibold text-sm"
        >
          <FiPlus size={16} />
          <span>Count</span>
        </button>
      </div>

      {/* Number State Panel */}
      <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
            Props Number
          </span>
          <span className="text-3xl font-black text-slate-800 tabular-nums">
            {number}
          </span>
        </div>
        <button
          onClick={() => setNumber(number + 1)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-xl hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-sm shadow-purple-200 font-semibold text-sm"
        >
          <FiPlus size={16} />
          <span>Number</span>
        </button>
      </div>
    </div>

    {/* Child Components Column */}
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <ExpensiveCalculation number={number} />
      <Child onClick={handleClick} />
    </div>

  </div>
</>
  );
}

export default Parent;