import express from "express";
import getDirList from "./endpoints/get/getDirList";
import getFile from "./endpoints/get/getFile";
import getFontList from "./endpoints/get/getFontList";

const app = express();
var cors = require("cors");
app.use(cors());
const port = 1234;

/* Get Endpoints */
getDirList(app);
getFile(app);
getFontList(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
