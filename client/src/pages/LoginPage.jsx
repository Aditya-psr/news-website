import { useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={login} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
