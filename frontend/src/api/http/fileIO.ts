import BinaryStream from 'functions/dataHandling/binarystream';
import { detectIFF, parseIFF } from 'functions/graphics/iff';
import { ENV } from 'constants/globals/env';
import { hex2int } from 'functions/dataHandling/dataHandling';
import { EnumDataFormat } from 'functions/dataHandling/IDataHandling';

export const getDirList = async (path: string) => {
  const request = await fetch(`${ENV.api}/getDirList?path=${path}`, {
    method: 'GET',
  });
  const response = await request.json();
  return response;
};

export const getFile = async (path: string, format: EnumDataFormat) => {
  const request = await fetch(`${ENV.api}/getFile?path=${path}`, {
    method: 'GET',
  });
  let result = null;
  switch (format) {
    case EnumDataFormat.ARRAY_BUFFER:
      result = await request.arrayBuffer();
      break;
    case EnumDataFormat.TEXT:
      result = await request.text();
      break;
  }
  return result as any;
};

export const getExe = async (path: string) => {
  const request = await fetch(`${ENV.api}/getExe?path=${path}`, {
    method: 'GET',
  });
  const response = await request.json();
  if (response.type === 'amiga') {
    const oldAddr = 0;
    const newAddr = 0;
    const length = 0;
    const newHunk: any = {};
    const oldHunk: any = {};

    const hunkData = response.hunks[1].hunkData;

    for (let i = 0; i < hunkData.length; i++) {
      const addr1 = hex2int(hunkData[i].addr);
      const addr2 = i + 1 < hunkData.length ? hex2int(hunkData[i + 1].addr) : 0;
      const length = addr2 - addr1;
      hunkData[i].length = length;
    }

    hunkData.map((hunk: any) => {
      console.log(hunk);
    });
  }
  return response;
};

export const getMem = async () => {
  const request = await fetch(`${ENV.api}/getMem`, {
    method: 'GET',
  });
  const response = await request.json();
  return response;
};

export const getTest = async (path: string) => {
  const request = await fetch(`${ENV.api}/getTest?path=${path}`, {
    method: 'GET',
  });
  const data = await request.arrayBuffer();

  const stream = BinaryStream(data.slice(0, data.byteLength), true);
  //console.log(stream);
  const fileType = detectIFF(stream);
  //console.log(fileType);
  const iff: any = parseIFF(stream, true, fileType);
  console.log(iff);

  //const y = Buffer.from(x).toString('base64');
  //return await request.text();
};
