import { ENV } from 'constants/env';

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

export const getFile = async (path: string) => {
  const request = await fetch(`${ENV.api}/getFile?path=${path}`, {
    method: 'GET',
  });
  return await request.text();
};

export const getFontList = async () => {
  const request = await fetch(`${ENV.api}/getFontList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await request.json();
  return response;
};
