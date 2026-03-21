import { useEffect, useState } from "react";
import API from "../services/api";
import { FaTrash, FaEdit, FaCheck, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  //  Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks ");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // add / update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Task title required ");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        await API.put(`/tasks/${editId}`, form);
        toast.success("Task updated ");
        setEditId(null);
      } else {
        await API.post("/tasks", form);
        toast.success("Task added ");
      }

      setForm({ title: "", description: "" });
      fetchTasks();
    } catch {
      toast.error("Something went wrong ");
      setLoading(false);
    }
  };

  // delete
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted ");
      fetchTasks();
    } catch {
      toast.error("Delete failed ");
    }
  };

  // toggle
  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch {
      toast.error("Update failed ");
    }
  };

  // edit
  const editTask = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditId(task._id);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  //  search filter
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  //  Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  //  Reset page on search or data change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, tasks]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 overflow-x-hidden">
      {loading && <Loader />}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-cyan-400">Task Manager</h1>
        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded hover:scale-105 transition"
        >
          Logout
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-[#1e293b] p-2 rounded mb-4">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="bg-transparent outline-none w-full text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="w-full mb-2 p-3 rounded bg-[#1e293b]"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="w-full mb-2 p-3 rounded bg-[#1e293b]"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 p-2 rounded">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {currentTasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks found</p>
        ) : (
          currentTasks.map((task) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1e293b] p-4 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p
                    className={`font-semibold ${
                      task.status === "completed"
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>

                <div className="flex gap-3 text-lg">
                  <FaCheck
                    className="cursor-pointer text-green-400"
                    onClick={() => toggleStatus(task)}
                  />
                  <FaEdit
                    className="cursor-pointer text-yellow-400"
                    onClick={() => editTask(task)}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteTask(task._id)}
                  />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/*  Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-700 rounded"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-cyan-500" : "bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 bg-gray-700 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
