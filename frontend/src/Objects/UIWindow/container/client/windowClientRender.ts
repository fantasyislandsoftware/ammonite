import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { pixelMerge } from 'functions/graphics/pixelArray';

export const windowClientRender = (window: IWindow) => {
  const { pixels: windowPixels, client } = window;
  const { x, y, pixels: clientPixels } = client;
  pixelMerge(clientPixels, windowPixels, x, y, null);
};
