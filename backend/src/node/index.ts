import initRestServer from "./restServer";
import initSocketServer from "./webSocketServer";

initRestServer();
initSocketServer();

//import express from "express";
//import { WebSocketServer } from "ws";

//const http = require("http");
//const url = require("url");
//var cors = require("cors");

//import getFile from "./endpoints/get/getFile";
//import getDirList from "./endpoints/get/getDirList";
//import getFontList from "./endpoints/get/getFontList";
//import getMem from "./endpoints/get/getMem";
//import getExe from "./endpoints/get/getExe";

//const rest = express();
//rest.use(cors());

//const restPort = 1234;
//const socketPort = 1235;

//getDirList(rest);
//getFile(rest);
//getExe(rest);
//getFontList(rest);
//getMem(rest);

//rest.listen(restPort, () => {
//  console.log(`Listening on port ${restPort}...`);
//});

//const server = http.createServer();
//const wsServer = new WebSocketServer({ server });

//wsServer.on("connection", (connection, request) => {
//  console.log("Connection established");
//});

//server.listen(socketPort, () => {
//  console.log(`Listening on port ${socketPort}...`);
//});
