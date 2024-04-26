import {
  EnumButtonFunc,
  EnumButtonState,
} from 'Objects/UIButton/buttonInterface';
import { makeMaximizeButton, makeOrderButton } from 'Objects/UIButton/buttons';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { drawLine } from 'api/lib/graphics/draw';
import { pixelMerge } from 'api/lib/graphics/pixelArray';
import { textOut } from 'api/lib/graphics/text';
import { VectorShape, drawVector } from 'api/lib/graphics/vector';

export const windowTitleBarRender = (window: IWindow) => {
  const { pixels: windowPixels, titleBar } = window;
  const { pixels: titleBarPixels, width, height, color, buttons } = titleBar;
  const { font, title } = titleBar;

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
    switch (button.func) {
      case EnumButtonFunc.ORDER:
        vectorData = makeOrderButton(button.state);
        break;
      case EnumButtonFunc.MAXIMIZE:
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
  drawLine(titleBarPixels, 0, height - 1, width, height - 1, 5);
  window.pixels = pixelMerge(
    titleBarPixels,
    windowPixels,
    titleBar.offset,
    titleBar.offset,
    null
  );
};
