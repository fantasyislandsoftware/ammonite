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

  //console.log(data);

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
      case "move.b":
        output.push(`M68K_API.move_8(self,"${arg}");`);
        break;
      case "bra.b":
        const i = Object.keys(sep).indexOf(`${padZeros(arg)}`);
        output.push(`M68K_API.bra(self,${i});`);
        break;
      case "rts":
        output.push("M68K_API.rts(self);");
        break;
      default:
        const l = `M68K_API.nc("${op}${arg.length > 0 ? " " : ""}${arg}");`;
        if (l.length > 0) {
          output.push(l);
        }
    }
  }

  output.map((line) => {
    if (line.includes("move_8")) {
      //console.log(line);
    }
    //console.log(`${line}`);
  });

  return { code: output.join("\n"), org: org };
};

const processJam = (data: string) => {
  return { code: data, org: 0 };
};

const hunkTypes: any = {
  "0000 03e7": "HUNK_UNIT",
  "0000 03e8": "HUNK_NAME",
  "0000 03e9": "HUNK_CODE",
  "0000 03ea": "HUNK_DATA",
  "0000 03eb": "HUNK_BSS",
  "0000 03ec": "HUNK_RELOC32",
  "0000 03ed": "HUNK_RELOC16",
  "0000 03ee": "HUNK_RELOC8",
  "0000 03ef": "HUNK_EXT",
  "0000 03f0": "HUNK_SYMBOL",
  "0000 03f1": "HUNK_DEBUG",
  "0000 03f3": "HUNK_HEADER",
  "0000 03f5": "HUNK_OVERLAY",
  "0000 03f6": "HUNK_BREAK",
  "0000 03f7": "HUNK_DREL32",
  "0000 03f8": "HUNK_DREL16",
  "0000 03f9": "HUNK_DREL8",
  "0000 03fa": "HUNK_LIB",
  "0000 03fb": "HUNK_INDEX",
  "0000 03fc": "HUNK_RELOC32SHORT",
  "0000 03fd": "HUNK_RELRELOC32",
  "0000 03fe": "HUNK_ABSRELOC16",
};

const getAmigaHunks = (data: string) => {
  let hunks: any = [];
  let hunkData: any = [];

  let hunkType = "Unknown";

  const hunkLines = data.split("\n");
  hunkLines.map((line) => {
    const addr = line.substring(0, 8);
    const hex = line.substring(10, 19);
    const op = line.substring(36, 44).trim();
    const arg = line.substring(44).trim();

    if (hex in hunkTypes && hunkData.length > 0) {
      hunks.push({ type: hunkType, data: hunkData });
      hunkData = [];
    }

    if (hex in hunkTypes) {
      hunkType = hunkTypes[hex];
    }

    if (addr.length) {
      hunkData.push({ addr, hex, op, arg });
    }
  });

  hunks.push({ type: hunkType, data: hunkData });

  return hunks;
};

const getJamHunks = (data: string) => {
  const lines = data.split("\n");
  const hunkType = "HUNK_CODE";
  let hunkData: any = [];
  let hunks: any = [];

  let addr = "";
  let hex = "";
  let op = "";
  let arg = "";

  lines.map((line, index) => {
    hunkData.push({ line: index, command: line });
  });
  hunks.push({ type: hunkType, data: hunkData });
  return hunks;
};

const packageData = async (path: string) => {
  const fileData = readFileSync(path as string);
  const fileType = examineHeader(fileData);
  let hunks: any = [];
  switch (fileType) {
    case "jam":
      hunks = getJamHunks(fileData.toString());
      break;
    case "amiga":
      hunks = getAmigaHunks(spawnSync("vda68k", [path]).stdout.toString());
      break;
  }
  return {
    type: fileType,
    hunks: hunks,
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
