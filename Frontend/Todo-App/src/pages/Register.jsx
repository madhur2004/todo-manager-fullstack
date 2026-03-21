import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    // Empty check
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    // Email validation
    if (!validateEmail(email)) {
      return toast.error("Enter valid email (example@gmail.com)");
    }

    // Password length
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await API.post("/auth/register", form);
      toast.success("Account created");
      navigate("/login");
    } catch {
      toast.error("Error creating account ");
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
        className="bg-[#1e293b] p-6 rounded-xl w-full max-w-sm"
      >
        <h2 className="text-white text-xl mb-4 text-center">Register</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button className="w-full bg-green-500 p-2 rounded hover:bg-green-600 transition">
          Register
        </button>

        <p className="text-gray-400 text-sm mt-3 text-center">
          Already have an account?
          <Link to="/login" className="text-cyan-400 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
