import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful ");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative">
      {/*  Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-5 left-5 text-cyan-400 hover:text-cyan-800"
      >
        ← Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-6 rounded-xl w-full max-w-sm shadow-lg"
      >
        <h2 className="text-white text-xl mb-4 text-center">Login</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-cyan-500 p-2 rounded hover:bg-cyan-600 transition">
          Login
        </button>

        <p className="text-gray-400 text-sm mt-3 text-center">
          Don't have an account?
          <Link to="/register" className="text-cyan-400 ml-1">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
