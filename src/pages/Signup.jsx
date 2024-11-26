import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { wait } from "../utils/wait";
import { url } from "../config";
import { useAuth } from "../hooks/useAuth";
import { axiosInstance } from "../utils/refresh";

export const Signup = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuth, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuth) {
      navigate("/home");
    }
  }, [isAuth, loading, navigate]);

  const onSignup = async (e) => {
    e.preventDefault();
    const data = {
      name: Username,
      email: Email,
      password: Password,
    };
    if (!Username || !Email || !Password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await axiosInstance.post(`${url}/api/signup`, data, {
        withCredentials: true,
      });
      console.log(res.data);
      setEmail("");
      setPassword("");
      setUsername("");
      localStorage.setItem("token", res.data.token);
      alert("Signup successful, redirecting to login page");
      await wait(1000);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full  h-screen flex justify-center items-center">
        <form
          onSubmit={onSignup}
          className="w-96 h-96 border-2 border-black flex flex-col justify-center gap-3 items-center"
        >
          <h1 className="text-2xl font-bold">Signup</h1>
          <input
            type="text"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-80 h-12 border-2 border-black p-3"
          />
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
            Signup
          </button>
        </form>
      </div>
    </>
  );
};
