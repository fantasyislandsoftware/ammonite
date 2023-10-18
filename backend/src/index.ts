import express from "express";
import getDirList from "./endpoints/get/getDirList";
import getFile from "./endpoints/get/getFile";

const app = express();
var cors = require("cors");
app.use(cors());
const port = 1234;

/* Get Endpoints */
getDirList(app);
getFile(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
