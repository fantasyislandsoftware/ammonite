import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import {
  makeMaximizeButton,
  makeOrderButton,
} from 'Objects/UIButton/props/buttons';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { drawLine } from 'api/lib/graphics/draw';
import {
  getPixelArrayDimensions,
  pixelMerge,
} from 'api/lib/graphics/pixelArray';
import { textOut } from 'api/lib/graphics/text';
import { VectorShape, drawVector } from 'api/lib/graphics/vector';

export const windowTitleBarRender = (window: IWindow) => {
  if (!window.titleBar) return;
  const { pixels: windowPixels, titleBar } = window;
  const { pixels: titleBarPixels, color, buttons } = titleBar;
  const { font, title } = titleBar;

  const { width, height } = getPixelArrayDimensions(titleBarPixels);

  /* Title */
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

  /* Buttons */
  buttons.map((button) => {
    let vectorData: VectorShape[] = [];
    switch (button.type) {
      case EnumButtonType.ORDER:
        vectorData = makeOrderButton(button.state);
        break;
      case EnumButtonType.MAXIMIZE:
        vectorData = makeMaximizeButton(button.state);
        break;
    }
    drawVector(
      titleBarPixels,
      vectorData,
      button.x,
      button.y,
      button.w,
      button.h
    );
  });

  /* Border */
  window.pixels = pixelMerge(
    titleBarPixels,
    windowPixels,
    titleBar.x,
    titleBar.y,
    null
  );
};
