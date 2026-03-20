import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h1 className="text-cyan-400 text-xl font-bold">TodoPro</h1>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="bg-cyan-500 px-4 py-1 rounded hover:scale-105 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 px-4 py-1 rounded hover:scale-105 transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center flex-1 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Manage Your Tasks Easily
        </motion.h1>

        <p className="text-gray-400 mb-6 max-w-lg">
          Add, update, delete and mark tasks as completed. Stay productive and
          organized with TodoPro.
        </p>

        {/* 🎥 Video */}
        <video
          autoPlay
          muted
          loop
          controls
          className="w-full max-w-md rounded-xl shadow-lg"
        >
          <source src="../../public/TodoPro.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 p-6">
        <div className="bg-[#1e293b] p-4 rounded-xl shadow">
          <h3 className="text-cyan-400 font-semibold">Add Tasks</h3>
          <p className="text-gray-400 text-sm">Quickly add your daily tasks.</p>
        </div>

        <div className="bg-[#1e293b] p-4 rounded-xl shadow">
          <h3 className="text-cyan-400 font-semibold">Update Tasks</h3>
          <p className="text-gray-400 text-sm">Edit tasks anytime.</p>
        </div>

        <div className="bg-[#1e293b] p-4 rounded-xl shadow">
          <h3 className="text-cyan-400 font-semibold">Track Progress</h3>
          <p className="text-gray-400 text-sm">Mark tasks as completed.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e293b] text-center p-4 text-gray-400">
        <p>© 2026 TodoPro | Built by Madhur </p>
      </footer>
    </div>
  );
}

export default Home;
