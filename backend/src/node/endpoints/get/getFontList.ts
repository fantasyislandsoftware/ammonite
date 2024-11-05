import { spawn } from "child_process";
import { Express } from "express";

const getFontList = async (app: Express) => {
  app.get("/getFontList", async (req, res) => {
    const { stdout } = spawn("fc-list");
    let stdoutStr = '';
    for await (const chunk of stdout) {
      stdoutStr += chunk;
    }
    const list = stdoutStr.split("\n");
    let data: any = [];
    list.map((font) => {
      if (font === "") return;
      const items = font.split(":");
      const path = items[0];
      const name = items[1];
      const style = items[2].replace("style=", "").toLowerCase();
      data.push({
        name: name,
        style: style,
        path: path,
      });
    });

    res.send(data);
  });
};

export default getFontList;
