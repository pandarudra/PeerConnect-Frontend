import { useEffect, useState } from "react";
import { initPeer } from "../WebRTC/peerService";
import { useParams, useNavigate } from "react-router-dom";

export const Call = () => {
  const [incall, setIncall] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const local = document.querySelector(".local");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        local.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
      });
  }, [param]);

  useEffect(() => {
    if (incall) {
      const peer = initPeer();

      return () => {
        if (peer) peer.destroy();
        console.log("Call Ended");
        window.location.reload();
      };
    }
  }, [incall]);

  useEffect(() => {
    if (param.type === "join") {
      const peer = initPeer();
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
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
  }, [param, navigate]);

  const callHandle = () => {
    setIncall(!incall);
    console.log("Call Ended", incall);
  };

  return (
    <div className="w-full h-screen flex gap-4 bg-gray-100 p-4">
      <div className="w-1/2 h-full">
        <video
          className="w-full h-full object-cover local"
          autoPlay
          loop
          muted
        ></video>
      </div>
      <div className="w-1/2 h-full">
        <video
          className="w-full h-full object-cover remote"
          autoPlay
          loop
          muted
        ></video>
      </div>
      {param.type === "create" && (
        <button
          onClick={callHandle}
          className="fixed top-4 right-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          {incall ? "End Call" : "Start Call"}
        </button>
      )}
    </div>
  );
};
