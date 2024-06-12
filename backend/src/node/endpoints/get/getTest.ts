import { Express } from "express";
import fs from "fs";

const getTest = async (app: Express) => {
  app.get("/getTest", async (req, res) => {
    const { path } = req.query;

    fs.readFile(path as string, (err, data) => {
      if (err) {
        res.send(err);
      }
      //const x = Buffer.from(data).toString("base64");
      res.send(data);
    });
  });
};

export default getTest;
