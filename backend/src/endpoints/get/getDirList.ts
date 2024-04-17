import { spawn } from "child_process";
import { Express } from "express";

const getDirList = async (app: Express) => {
  app.get("/getDirList", async (req, res) => {
    const { path } = req.query;
    const { stdout, stderr } = spawn("ls", ["-p", path as string]);
    const stdoutStr = await new Response(stdout).text();
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
