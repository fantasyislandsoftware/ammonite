import { spawn } from "node:child_process";
import { Express } from "express";

const getDirList = async (app: Express) => {
  app.get("/getDirList", async (req, res) => {
    const { path } = req.query;
    const { stdout } = spawn("ls", ["-p", path as string]);

    let stdoutStr = '';
    for await (const chunk of stdout) {
      stdoutStr += chunk;
    }
    const list = stdoutStr.split("\n");
    let json: any = [];
    list.forEach((name) => {
      if (name === "") return;
      let type = "file";
      if (name.endsWith("/")) {
        name = name.slice(0, -1);
        type = "folder";
      }
      json.push({ name: name, type: type });
    });
    res.send(json);
  });
};

export default getDirList;
