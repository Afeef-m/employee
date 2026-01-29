import { useState } from "react";
import { saveToken } from "../auth/auth";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });

      saveToken(res.data.token);

      // alert("Login success");
      navigate("/departments")
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form
  onSubmit={handleLogin}
  className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-lg shadow space-y-4"
>
  <h2 className="text-2xl font-bold text-center">Login</h2>

  <input
    type="email"
    placeholder="Email"
    onChange={(e) => setEmail(e.target.value)}
    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    type="password"
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
  >
    Login
  </button>
</form>

  );
}
