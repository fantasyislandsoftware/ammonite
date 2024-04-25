import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { drawFillRect } from 'api/lib/graphics/draw';

export const windowBorderRender = (window: IWindow) => {
  const { pixels: windowPixels } = window;

  drawFillRect(windowPixels, 0, 0, window.width, window.height, 0);
};
