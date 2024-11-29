import { ENV } from 'constants/globals/env';
import { ITask } from 'stores/useTaskStore';

export class JAM_FONT {
  /****************************************************/

  getFontList = async (task: ITask | null, v: any) => {
    task = null;
    const request = await fetch(`${ENV.api}/getFontList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    return { data: response, v: v };
  };

  /****************************************************/

  loadFont = async (task: ITask | null, name: string, path: string) => {
    task = null;
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

  /****************************************************/

  loadFonts = async (task: ITask | null) => {
    task = null;
    const list = await this.getFontList(null, 'loadFonts');
    list.data.map((font: any) => {
      const { name, path } = font;
      const fontFace = new FontFace(
        name,
        `url(${ENV.api}/getFile?path=${path})`
      );
    });
  };

  /****************************************************/
}
