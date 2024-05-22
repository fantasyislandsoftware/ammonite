import BinaryStream from 'api/lib/data/binarystream';
import { detectIFF, parseIFF } from 'api/lib/data/iff';
import { ENV } from 'constants/globals/env';
import { EnumDataFormat } from 'interface/data';

export const getDirList = async (path: string) => {
  const request = await fetch(`${ENV.api}/getDirList?path=${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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
