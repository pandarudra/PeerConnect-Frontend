import Peer from "peerjs";

let peer = null;

export const initPeer = () => {
  peer = new Peer(undefined, {
    host: "localhost",
    port: 9000,
    path: "/peerjs",
  });

  peer.on("open", (id) => {
    console.log("My peer ID is: " + id);
  });

  peer.on("call", (call) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          const video = document.querySelector(".remote");
          video.srcObject = remoteStream;
        });
      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
      });
  });

  return peer;
};

export const getPeer = () => {
  return peer;
};
