import React, { useState } from "react";

export const TodoApp = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter(
      (item) => item.id !== id
    );

    setTasks(updatedTasks);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 To-Do App
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks available.
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-lg"
              >
                <span className="text-gray-700 font-medium">
                  {item.text}
                </span>

                <button
                  onClick={() => deleteTask(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};