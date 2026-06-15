import useCounter from "./hooks/useCounter";
import { FiPlus, FiMinus, FiRotateCcw } from "react-icons/fi";

function CounterB() {
  const { count, increment, decrement, reset } = useCounter(100, 10);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center w-full max-w-sm transition-transform duration-300 hover:-translate-y-1">
      
      <div className="bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider py-1 px-3 rounded-full mb-6">
        Counter B
      </div>

      <h2 className="text-6xl font-black text-slate-800 mb-8 tabular-nums tracking-tighter">
        {count}
      </h2>

      <div className="flex gap-4 mb-4 w-full justify-center">
        <button
          onClick={decrement}
          className="flex items-center justify-center w-14 h-14 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 hover:text-red-600 transition-all active:scale-90 focus:outline-none focus:ring-4 focus:ring-red-100"
          aria-label="Decrease by 10"
        >
          <FiMinus size={24} />
          <span className="text-xs font-bold ml-1">10</span>
        </button>

        <button
          onClick={increment}
          className="flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl hover:bg-blue-100 hover:text-blue-600 transition-all active:scale-90 focus:outline-none focus:ring-4 focus:ring-blue-100"
          aria-label="Increase by 10"
        >
          <FiPlus size={24} />
          <span className="text-xs font-bold ml-1">10</span>
        </button>
      </div>

      <button
        onClick={reset}
        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-slate-100"
      >
        <FiRotateCcw size={18} />
        <span>Reset</span>
      </button>
      
    </div>
  );
}

export default CounterB;