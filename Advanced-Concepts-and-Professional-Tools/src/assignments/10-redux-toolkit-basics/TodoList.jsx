import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "./features/todoSlice";
import { FiTrash2, FiCheckSquare } from "react-icons/fi";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  // Production-level Empty State View
  if (!todos || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <FiCheckSquare size={36} className="text-slate-300 mb-3" />
        <p className="text-sm font-medium text-slate-500">All caught up!</p>
        <p className="text-xs text-slate-400 text-center mt-1">
          Add items above to map out your upcoming schedule.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="group flex justify-between items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-200"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Visual Indicator Checkbox Element */}
            <div className="w-5 h-5 rounded-md border border-slate-300 flex items-center justify-center bg-slate-50 text-transparent transition-colors group-hover:border-indigo-400" />
            
            <span className="text-sm font-medium text-slate-700 truncate pr-2">
              {todo.text}
            </span>
          </div>

          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="flex items-center justify-center p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl active:scale-90 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 focus:outline-none focus:opacity-100"
            aria-label="Delete task item"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;