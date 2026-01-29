import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data:", form);

    try {
      const res = await api.post("/register", form);
      console.log("Response:", res.data);
      // alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.error("Error Response:", err.response?.data);
      alert("Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
}
