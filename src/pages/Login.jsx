import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../config";
import { wait } from "../utils/wait";
import { useAuth } from "../hooks/useAuth";
import { axiosInstance } from "../utils/refresh";

export const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isAuth, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuth) {
      navigate("/home");
    }
  }, [isAuth, loading, navigate]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: Email,
      password: Password,
    };
    if (!Email || !Password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await axiosInstance.post(`${url}/api/login`, data, {
        withCredentials: true,
      });
      console.log(res.data);
      setEmail("");
      setPassword("");
      localStorage.setItem("token", res.data.token);
      alert("Login successful, redirecting to home page");
      await wait(1000);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-red-900 to-black rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white mb-8 font-['Montserrat']">
          LOGIN
        </h1>
        <form onSubmit={onLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-gray-200 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-gray-400 placeholder:italic"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-gray-200 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-gray-400 placeholder:italic"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-bold text-lg bg-gradient-to-r from-red-600 to-red-300 rounded-lg text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-300 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

