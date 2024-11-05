import { Express } from "express";
import { readFileSync } from "fs";
const { spawnSync } = require("node:child_process");

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

const getAmigaHunks = (data: string, raw: any) => {
  let hunks: any = [];
  let hunkData: any = [];

  let hunkType = "Unknown";

  const hunkLines = data.split("\n");
  let offset = 0;
  hunkLines.map((line) => {
    const addr = line.substring(0, 8);
    const hex = line.substring(10, 19).trim();
    const op = line.substring(36, 44).trim();
    const arg = line.substring(44).trim();

    if (hex in hunkTypes && hunkData.length > 0) {
      hunks.push({ type: hunkType, hunkData: hunkData });
      hunkData = [];
      offset = 0;
    }

    if (hex in hunkTypes) {
      hunkType = hunkTypes[hex];
    }

    if (addr.length) {
      /*if (offset > 1) {
        const hexArray = hex.split(" ");
        hexArray.map((val) => {
          for (let n = 0; n < 2; n++) {
            const x = val.slice(n * 2, n * 2 + 2);
            hunkData.push(parseInt(x, 16));
          }
        });
      }*/
      hunkData.push({ addr, hex, op, arg });
    }

    offset++;
  });

  hunks.push({ type: hunkType, hunkData: hunkData });

  return hunks;
};

const getJamHunks = (data: string) => {
  const lines = data.split("\n");
  const hunkType = "HUNK_CODE";
  let hunkData: any = [];
  let hunks: any = [];

  lines.map((line, index) => {
    hunkData.push({ line: index, command: line });
  });
  hunks.push({ type: hunkType, hunkData: hunkData });
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
      hunks = getAmigaHunks(
        spawnSync("vda68k", [path]).stdout.toString(),
        readFileSync(path)
      );
      break;
  }
  return {
    type: fileType,
    raw: fileData,
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
