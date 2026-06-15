import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

function ReduxTodoDemo() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 transition-all duration-300">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
            Task <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Manager</span>
          </h1>
          <p className="text-sm text-slate-400">
            Keep track of your daily routine with global state management.
          </p>
        </div>

        {/* Input Form Component */}
        <AddTodo />

        {/* Dynamic Todo List */}
        <TodoList />
        
      </div>
    </div>
  );
}

export default ReduxTodoDemo;