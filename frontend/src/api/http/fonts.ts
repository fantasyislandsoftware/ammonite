import { ENV } from 'constants/globals/env';

export const loadFont = async (name: string, path: string) => {
  if (path === 'NaN') {
    return {
      load: async () => {
        return { family: name };
      },
    };
  } else {
    const fontFace = new FontFace(
      name as string,
      `url(${ENV.api}/getFile?path=${path})`
    );
    return fontFace;
  }
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
