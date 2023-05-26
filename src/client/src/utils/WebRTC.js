const RTC_CONFIG = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ],
    },
  ],
};

export class WebRTC {
  constructor(socket, roomId) {
    this.peerConnection = new RTCPeerConnection(RTC_CONFIG);
    this.socket = socket;
    this.roomId = roomId;
  }

  addTracks = async (stream) => {
    console.log("add Tracks");
    await stream
      .getTracks()
      .forEach((track) => this.peerConnection.addTrack(track, stream));
  };

  setIceCandidate = () => {
    console.log("setIceCandidate");
    this.peerConnection.addEventListener("icecandidate", (data) => {
      this.socket.emit("ice", data.candidate, this.roomId);
    });
  };

  setRemoteVideo = (ref) => {
    console.log("setRemoteVideo");
    this.peerConnection.addEventListener("track", (data) => {
      ref.current.srcObject = data.streams[0];
    });
  };

  setLocalOffer = async () => {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    console.log("sent the offer");
    this.socket.emit("offer", offer, this.roomId);
  };

  getRemoteOffer = async (offer) => {
    console.log("got the offer");
    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    console.log("sent the answer");
    this.socket.emit("answer", answer, this.roomId);
  };

  getRemoteAnswer = async (answer) => {
    console.log("got remote answer");
    await this.peerConnection.setRemoteDescription(answer);
  };

  getRemoteIce = async (ice) => {
    await this.peerConnection.addIceCandidate(ice);
  };
}
