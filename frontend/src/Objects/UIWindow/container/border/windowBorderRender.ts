import { WindowColour } from 'Objects/UIWindow/windowColour';
import { IWindow } from 'Objects/UIWindow/windowInterface';
import { drawFillRect } from 'api/lib/graphics/draw';
import { IPixelArray } from 'interface/graphics';

export const windowBorderRender = (window: IWindow) => {
  const { width, height, titleBar, borderThickness, pixels } = window;
  drawFillRect(pixels, 0, 0, width, height, WindowColour.BORDER);
  drawFillRect(
    pixels,
    borderThickness,
    borderThickness,
    width - borderThickness,
    height - borderThickness,
    WindowColour.CLIENT
  );
};
