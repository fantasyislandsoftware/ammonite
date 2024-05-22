import express from "express";
const { Server } = require("socket.io");
const os = require("os");

const http = require("http");

import getTest from "./endpoints/get/getTest";
import getFile from "./endpoints/get/getFile";
import getDirList from "./endpoints/get/getDirList";
import getFontList from "./endpoints/get/getFontList";

const app = express();
var cors = require("cors");
app.use(cors());

const restPort = 1234;
const socketPort = 1235;

getDirList(app);
getFile(app);
getFontList(app);
getTest(app);

app.listen(restPort, () => {
  console.log(`Listening on port ${restPort}...`);
});

const socketServer = http.createServer();
const socket = new Server(socketServer, {
  cors: {
    origin: "*",
  },
});

socket.on("connection", (socket: any) => {
  socket.on("getMemory", () => {
    socket.emit("returnGetMemory", {
      total: os.totalmem(),
      free: os.freemem(),
    });
  });
});

socketServer.listen(socketPort, () => {
  console.log(`Socket.io listening on port ${socketPort}`);
});
