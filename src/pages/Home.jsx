import { useEffect, useState } from "react";
import { BsBroadcast } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { FaVolumeMute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { url } from "../config";
import { axiosInstance } from "../utils/refresh";

export const Home = () => {
  const [audio, setAudio] = useState(true);
  const [callid, setCallid] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const video = document.querySelector("video");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: audio })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
      });
  }, [audio]);

  const onjoin = () => {
    if (!callid) {
      alert("Please enter a room id");
      return;
    }

    navigate(`/call/join/${callid}`);
  };

  const onCreateCall = () => {
    const id = uuid();
    navigate(`/call/create/${id}`);
  };
  const onLogout = async () => {
    try {
      const res = await axiosInstance.post(`${url}/api/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-full h-screen flex gap-4 bg-gray-100 p-4">
      <div className="w-1/2 h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <video className="w-full h-full object-cover" autoPlay loop></video>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to PeerConnect</h1>
          <button
            onClick={onCreateCall}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            <BsBroadcast className="inline-block mr-2" /> Start Call
          </button>
          <div className="w-full h-20 flex justify-center gap-3">
            <button
              onClick={() => setAudio(!audio)}
              className="text-2xl bg-red-600 px-2 rounded-full h-12 flex justify-center items-center mt-3"
            >
              <FaVolumeMute className="inline-block mr-2" />
            </button>
          </div>
          <input
            type="text"
            value={callid}
            onChange={(e) => setCallid(e.target.value)}
            className="w-full mt-4 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter Room ID"
          />
          <button
            onClick={onjoin}
            className="w-full mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Join Call
            <IoCall className="inline-block ml-2" />
          </button>
          <button
            onClick={onLogout}
            className="w-full mt-4 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
