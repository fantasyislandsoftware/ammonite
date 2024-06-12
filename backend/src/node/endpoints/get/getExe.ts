import { Express } from "express";
import fs from "fs";

const examineHeader = (data: Buffer) => {
  const jam = [47, 42, 32, 64, 74, 65, 77, 32, 42, 47];
  const amiga = [0, 0, 3];

  const UNKNOWN = "unknown";

  let id = [];
  for (let i = 0; i < 10; i++) {
    id.push(data[i]);
  }

  /* JAM Test */
  let result = "jam";
  jam.map((val, index) => {
    if (val !== data[index]) {
      result = UNKNOWN;
    }
  });
  if (result !== UNKNOWN) {
    return result;
  }

  /* Amiga Executable Test */
  result = "amiga";
  amiga.map((val, index) => {
    if (val !== data[index]) {
      result = UNKNOWN;
    }
  });
  if (result !== UNKNOWN) {
    return result;
  }

  return result;
};

const getExe = async (app: Express) => {
  app.get("/getExe", async (req, res) => {
    const { path } = req.query;
    fs.readFile(path as string, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        const code = data.toString("base64");
        const type = examineHeader(data);
        res.send({ type: type, code: code });
      }
    });
  });
};

export default getExe;
