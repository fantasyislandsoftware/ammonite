import express from "express";

import getFile from "./endpoints/get/getFile";
import getDirList from "./endpoints/get/getDirList";
import getFontList from "./endpoints/get/getFontList";
import getMem from "./endpoints/get/getMem";

const app = express();
var cors = require("cors");
app.use(cors());

const restPort = 1234;

getDirList(app);
getFile(app);
getFontList(app);
getMem(app);

app.listen(restPort, () => {
  console.log(`Listening on port ${restPort}...`);
});
