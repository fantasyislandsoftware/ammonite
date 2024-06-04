import { Express } from "express";
import os from "os";

const getMem = async (app: Express) => {
  app.get("/getMem", async (req, res) => {
    res.send({
      total: os.totalmem(),
      free: os.freemem(),
    });
  });
};

export default getMem;
