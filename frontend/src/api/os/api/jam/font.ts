import { ENV } from 'constants/globals/env';

export class JAM_FONT {
  getFontList = async (v: string) => {
    const request = await fetch(`${ENV.api}/getFontList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    return { data: response, v: v };
  };
}
