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
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full  h-screen flex justify-center items-center">
        <form
          onSubmit={onLogin}
          className="w-96 h-96 border-2 border-black flex flex-col justify-center gap-3 items-center"
        >
          <h1 className="text-2xl font-bold">Login</h1>

          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-80 h-12 border-2 border-black p-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 h-12 border-2 border-black p-3"
          />
          <button className="w-80 h-12 bg-blue-500 hover:bg-blue-900 text-2xl text-white">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
