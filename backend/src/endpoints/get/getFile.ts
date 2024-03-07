import { Express } from "express";
import fs from "node:fs";

const getFile = async (app: Express) => {
  app.get("/getFile", async (req, res) => {
    const { path } = req.query;
    fs.readFile(path as string, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.send(data);
    });
  });
};

export default getFile;
