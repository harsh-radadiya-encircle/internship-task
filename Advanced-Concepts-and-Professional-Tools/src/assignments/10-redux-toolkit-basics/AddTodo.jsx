import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./features/todoSlice";
import { FiPlus } from "react-icons/fi"; // Ensure you run: npm install react-icons

function AddTodo() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddTodo();
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          value={text}
          placeholder="What needs to be done?"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl transition-all duration-200 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <button
        onClick={handleAddTodo}
        className="flex items-center justify-center p-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-md shadow-indigo-200"
        aria-label="Add project task"
      >
        <FiPlus size={20} className="stroke-[2.5]" />
      </button>
    </div>
  );
}

export default AddTodo;