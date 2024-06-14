import { Express } from "express";
import fs, { readFileSync } from "fs";
const { spawnSync } = require("node:child_process");
//const ls = spawn('ls', ['-lh', '/usr']);

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

const padZeros = (str: string) => {
  return "00000000".substring(str.length - 1) + str.replace("x", "");
};

const processAmiga = (data: string) => {
  let sep: any = {};
  let output: string[] = [];
  let org = 0;
  const split = data.split("\n");
  split.map((line, index) => {
    let code: string[] = [];
    const addr = line.substring(0, 8);
    const hex = line.substring(10, 19);
    const op = line.substring(36, 44).trim();
    const arg = line.substring(44).trim();

    if (addr.trim() !== "") {
      sep[addr] = { addr, hex, op, arg };
    }
  });

  let i = 0;
  for (const key in sep) {
    const addr = sep[key].addr.trim();
    const hex = sep[key].hex.trim();
    if (hex === "0000 03e9") {
      org = i + 2;
    }
    i++;
    const op = sep[key].op.trim();
    const arg = sep[key].arg.trim();
    switch (op) {
      case "bra.b":
        const i = Object.keys(sep).indexOf(`${padZeros(arg)}`);
        output.push(`bra(${i});`);
        break;
      case "rts":
        output.push("ret();");
        break;
      default:
        const l = `nop("${op}${arg.length > 0 ? " " : ""}${arg}");`;
        if (l.length > 0) {
          output.push(l);
        }
    }
  }

  output.map((line) => {
    console.log(`${line}`);
  });

  return { code: output.join("\n"), org: org };
};

const processJam = (data: string) => {
  return { code: data, org: 0 };
};

const packageData = async (path: string) => {
  const fileData = readFileSync(path as string);
  const fileType = examineHeader(fileData);
  let data: any = {};
  switch (fileType) {
    case "jam":
      data = processJam(fileData.toString());
      break;
    case "amiga":
      data = processAmiga(spawnSync("vda68k", [path]).stdout.toString());
      break;
  }
  return {
    type: fileType,
    org: data.org,
    code: Buffer.from(data.code).toString("base64"),
  };
};

const getExe = async (app: Express) => {
  app.get("/getExe", async (req, res) => {
    const { path } = req.query;
    const response = await packageData(path as string);
    res.send(response);
  });
};

export default getExe;
