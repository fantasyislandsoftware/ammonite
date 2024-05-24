import { ENV } from 'constants/globals/env';

export class SYSTEM_API {
  constructor() {}

  /****************************************************/

  getFontList = async () => {
    const request = await fetch(`${ENV.api}/getFontList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    return response;
  };

  /****************************************************/
}
