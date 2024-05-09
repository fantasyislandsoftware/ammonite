import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { plot } from 'api/lib/graphics/draw';
import { pixelMerge } from 'api/lib/graphics/pixelArray';

export const windowClientRender = (window: IWindow) => {
  const { pixels: windowPixels, client } = window;
  const { x, y, pixels: clientPixels } = client;

  pixelMerge(clientPixels, windowPixels, x, y, 0);
};
