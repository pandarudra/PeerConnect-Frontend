import { useEffect, useState } from "react";
import { initPeer, updatePeer } from "../WebRTC/peerService";
import { useParams, useNavigate } from "react-router-dom";
import { IoCallSharp } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GoUnmute } from "react-icons/go";
import { FaVolumeMute } from "react-icons/fa";
import { CiVideoOn, CiVideoOff } from "react-icons/ci";

export const Call = () => {
  const [incall, setIncall] = useState(false);
  const [audio, seAudio] = useState(true);
  const [Video, setVideo] = useState(true);

  const [call, setCall] = useState(null);
  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const local = document.querySelector(".local");

    navigator.mediaDevices
      .getUserMedia({ video: Video, audio: audio })
      .then((stream) => {
        local.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
      });
  }, [param, Video, audio]);

  useEffect(() => {
    if (incall) {
      const peer = initPeer();
      setCall(peer);
      return () => {
        if (peer) peer.destroy();
        console.log("Call Ended");
        // window.location.reload();
      };
    }
  }, [incall, Video, audio]);

  useEffect(() => {
    if (param.type === "join") {
      const peer = initPeer();
      navigator.mediaDevices
        .getUserMedia({ video: Video, audio: audio })
        .then((stream) => {
          const call = peer.call(param.id, stream);
          call.on("stream", (remoteStream) => {
            const remote = document.querySelector(".remote");
            remote.srcObject = remoteStream;
          });
          call.on("close", () => {
            console.log("Call Ended");
            navigate("/home");
          });
        })
        .catch((err) => {
          console.error("Error accessing media devices.", err);
        });
    }
  }, [param, navigate, Video, audio]);

  const callHandle = () => {
    setIncall(!incall);
    console.log("Call Ended", incall);
  };

  useEffect(() => {
    if (call) {
      updatePeer(call, Video, audio);
    }
  });
  return (
    <div className="w-full h-screen flex gap-4 bg-[#434343] p-1">
      <div className={`w-96  h-64 absolute right-3 bottom-9`}>
        <video
          className="w-full h-full object-cover local rotate"
          autoPlay
          loop
        ></video>
      </div>
      <div className={`w-full  h-full `}>
        <video
          className="w-full h-full object-cover remote rotate"
          autoPlay
          loop
        ></video>
      </div>
      {param.type === "create" && (
        <button
          onClick={callHandle}
          className={`fixed top-4 right-4 px-6 py-3 bg-[#1E1E1E] text-white rounded-lg shadow-md ${
            incall ? "hover:bg-[#a93a26]" : "hover:bg-[#14a914]"
          } transition duration-300`}
        >
          {incall ? (
            <MdCallEnd className="text-2xl" />
          ) : (
            <IoCallSharp className="text-2xl" />
          )}
        </button>
      )}
      <div className="w-full h-16 fixed bottom-0 left-0 flex justify-center gap-3 items-center bg-[#1f1c1c]">
        {!incall && (
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-[#373737] text-white rounded-lg shadow-md hover:bg-[#a03a3a] transition duration-300"
          >
            <RiArrowGoBackFill className="text-2xl" />
          </button>
        )}
        <button
          onClick={() => seAudio(!audio)}
          className="px-6 py-3 bg-[#373737] text-white rounded-lg shadow-md  transition duration-300"
        >
          {audio ? (
            <GoUnmute className="text-green-500  text-2xl" />
          ) : (
            <FaVolumeMute className="text-red-500 text-2xl" />
          )}
        </button>
        <button
          onClick={() => setVideo(!Video)}
          className="px-6 py-3 bg-[#373737] text-white rounded-lg shadow-md  transition duration-300"
        >
          {Video ? (
            <CiVideoOn className="text-green-500 text-2xl" />
          ) : (
            <CiVideoOff className="text-red-500 text-2xl" />
          )}
        </button>
        {incall && (param.type = "join") && (
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-[#373737] text-white rounded-lg shadow-md hover:bg-[#a03a3a] transition duration-300"
          >
            <MdCallEnd className="text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
};
