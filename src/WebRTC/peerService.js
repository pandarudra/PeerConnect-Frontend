import { Peer } from "peerjs";

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

export const updatePeer = async (call, video, audio) => {
  console.log("Updating media stream");
  console.log("Video:", video);
  console.log("Audio:", audio);
  console.log("Call:", call);
  console.log("Call.peerConnection:", call._connection);
  if (!call._connection) {
    console.log("No connection found");
    return;
  }
  try {
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: video,
      audio: audio,
    });
    const videoLocal = document.querySelector("video.local");
    videoLocal.srcObject = newStream;

    if (call) {
      const videoSender = call._connection
        .getSenders()
        .find((s) => s.track.kind === "video");
      if (videoSender) {
        videoSender.replaceTrack(newStream.getVideoTracks()[0]);
      }
      const audioSender = call._connection
        .getSenders()
        .find((s) => s.track.kind === "audio");
      if (audioSender) {
        audioSender.replaceTrack(newStream.getAudioTracks()[0]);
      }
    }
  } catch (err) {
    console.error("Error updating media stream:", err);
  }
};
