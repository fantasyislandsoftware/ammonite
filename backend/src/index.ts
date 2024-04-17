import express from "express";
import getTest from "./endpoints/get/getTest";
import getFile from "./endpoints/get/getFile";
import getDirList from "./endpoints/get/getDirList";
import getFontList from "./endpoints/get/getFontList";

const app = express();
var cors = require("cors");
app.use(cors());
const port = 1234;

getDirList(app);
getFile(app);
getFontList(app);
getTest(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
