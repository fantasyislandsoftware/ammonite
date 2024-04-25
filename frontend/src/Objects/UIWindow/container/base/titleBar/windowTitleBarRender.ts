import { IWindow } from 'Objects/UIWindow/windowInterface';
import { drawLine } from 'api/lib/graphics/draw';
import { pixelMerge } from 'api/lib/graphics/pixelArray';
import { textOut } from 'api/lib/graphics/text';

export const windowTitleBarRender = (window: IWindow) => {
  const { pixels: windowPixels, titleBar } = window;
  const { pixels: titleBarPixels, height, color } = titleBar;
  const { font, title } = titleBar;
  textOut(
    titleBarPixels,
    0,
    0,
    title,
    color.text,
    color.background,
    font.name,
    font.size
  );
  drawLine(
    titleBarPixels,
    0,
    height - 1,
    titleBar.pixels[0].length,
    height - 1,
    0
  );
  window.pixels = pixelMerge(
    titleBarPixels,
    windowPixels,
    titleBar.offset,
    titleBar.offset,
    null
  );
};
