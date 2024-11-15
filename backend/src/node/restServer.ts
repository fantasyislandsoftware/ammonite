import express from "express";
import getDirList from "./endpoints/get/getDirList";
import getExe from "./endpoints/get/getExe";
import getFile from "./endpoints/get/getFile";
import getFontList from "./endpoints/get/getFontList";
import getMem from "./endpoints/get/getMem";

const initRestServer = () => {
  const server = express();
  var cors = require("cors");
  server.use(cors());
  const port = 1234;

  getDirList(server);
  getFile(server);
  getExe(server);
  getFontList(server);
  getMem(server);

  server.listen(port, () => {
    console.log(`Rest started on port: ${port}`);
  });
};

export default initRestServer;
