import { useEffect, useState } from "react";
import { BsBroadcast } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { FaVolumeMute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { TbLogout2 } from "react-icons/tb";
import { url } from "../config";
import { axiosInstance } from "../utils/refresh";
import { GoUnmute } from "react-icons/go";
import { CiVideoOn } from "react-icons/ci";
import { CiVideoOff } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

export const Home = () => {
  const [audio, setAudio] = useState(true);
  const [Video, setVideo] = useState(true);
  const [callid, setCallid] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const video = document.querySelector("video");
    if (!Video) return;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: audio })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
      });
  }, [audio, Video]);

  const onjoin = () => {
    if (!callid) {
      toast.error("Please enter a Call id", {
        position: "top-right",
      });

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
    <div className="w-full h-screen flex gap-4 bg-black p-4">
      <Toaster />
      <div className="w-1/2 h-full bg-black shadow-lg  overflow-hidden">
        {Video ? (
          <video
            className="w-full h-full object-cover rotate"
            autoPlay
            loop
          ></video>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1545176319-780c7d9cfdcc?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-full bg-center bg-cover rotate bg-black flex justify-center items-center text-white text-4xl"
          />
        )}
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white gfont2 flex gap-3">
            Welcome to Peer
            <p className="text-[#ff6352]">Connect</p>
          </h1>
          <button
            onClick={onCreateCall}
            className="px-6 py-3 bg-[#1E1E1E] gfont text-white rounded-lg shadow-md hover:bg-[#373737] transition duration-300"
          >
            <BsBroadcast className="inline-block mr-2 h-5 w-5" /> Start Call
          </button>
          <div className="w-full h-20 flex justify-center gap-3">
            <button
              onClick={() => setAudio(!audio)}
              className="text-2xl  px-2 rounded-full h-12 flex justify-center items-center mt-3"
            >
              {audio ? (
                <GoUnmute className="text-green-500" />
              ) : (
                <FaVolumeMute className="text-red-500" />
              )}
            </button>
            <button
              onClick={() => {
                setVideo(!Video);
              }}
              className="text-2xl  px-2 rounded-full h-12 flex justify-center items-center mt-3"
            >
              {Video ? (
                <CiVideoOn className="text-green-500" />
              ) : (
                <CiVideoOff className="text-red-500" />
              )}
            </button>
          </div>
          <input
            type="text"
            value={callid}
            onChange={(e) => setCallid(e.target.value)}
            className="w-full px-4 py-3 mt-2 text-gray-200 bg-transparent rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-gray-400 placeholder:italic"
            placeholder="Enter Call ID"
          />
          <button
            onClick={onjoin}
            className="w-full h-14 gfont mt-4 px-6 py-3 bg-[#1E1E1E] text-white rounded-lg shadow-md hover:bg-[#373737] transition duration-300"
          >
            Join Call
            <IoCall className="inline-block ml-2" />
          </button>
          <button
            onClick={onLogout}
            className="w-14 absolute bottom-0 m-2 text-center right-0 mt-4  h-14 hover:bg-[#be200e] p-3  text-white  shadow-md bg-[#931608] rounded-full flex justify-center transition duration-300"
          >
            <TbLogout2 className="inline-block  w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};
