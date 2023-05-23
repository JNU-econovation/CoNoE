import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const httpServer = http.createServer(app);

const PORT = 8080;

const wsServer = SocketIO(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
