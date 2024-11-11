import { spawn } from "child_process";
import { Express } from "express";

const getFontList = async (app: Express) => {
  app.get("/getFontList", async (req, res) => {
    const { stdout } = spawn("fc-list");
    let stdoutStr = "";
    for await (const chunk of stdout) {
      stdoutStr += chunk;
    }
    const list = stdoutStr.split("\n");
    let data: any = [];
    list.map((font) => {
      if (font === "") return;
      const items = font.split(":");
      let name = "";
      let style = "";
      let path = "";
      items.map((item) => {
        if (item.includes("/")) {
          path = item;
        }
        if (item.includes("style=")) {
          style = item.replace("style=", "");
        }
      });
      if (items.length === 2) {
        name = items[1];
      } else {
        name = items[1];
      }

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
