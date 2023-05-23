import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const httpServer = http.createServer(app);

const PORT = 3001;

const wsServer = SocketIO(httpServer, {
  cors: {
    origin: "*",
  },
});

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("welcome");
  });

  socket.on("offer", (offer, roomId) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", (answer, roomId) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice", (ice, roomId) => {
    socket.to(roomId).emit("ice", ice);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
