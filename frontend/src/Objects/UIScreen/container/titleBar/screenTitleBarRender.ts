import { IScreen } from 'Objects/UIScreen/screenInterface';
import { textOut } from 'api/lib/graphics/text';
import { drawLine } from 'api/lib/graphics/draw';
import { maximizeButton, orderButton } from 'Objects/UIButton/buttons';
import { pixelMerge } from 'api/lib/graphics/pixelArray';
import {
  EnumButtonState,
  EnumButtonFunc,
} from 'Objects/UIButton/buttonInterface';
import { ScreenColour } from 'Objects/UIScreen/screenColour';
import { IPixelArray } from 'interface/graphics';

export const screenTitleBarRender = (pixels: IPixelArray, screen: IScreen) => {
  const { titleBar } = screen;
  if (!titleBar) return pixels;

  /* Title */
  textOut(
    titleBar.pixels,
    0,
    0,
    titleBar.title,
    ScreenColour.TITLEBAR_TEXT,
    ScreenColour.TITLEBAR_BACKGROUND,
    titleBar.font.name,
    titleBar.font.size
  );

  /* Buttons */
  screen.titleBar?.buttons.map((button) => {
    const { x, y, w, h } = button;

    switch (button.func) {
      case EnumButtonFunc.ORDER:
        pixels = pixelMerge(
          orderButton(w, h, ScreenColour.TITLEBAR_BACKGROUND, button.state),
          pixels,
          x,
          y,
          null
        );
        break;
      case EnumButtonFunc.MAXIMIZE:
        pixels = pixelMerge(
          maximizeButton(w, h, ScreenColour.TITLEBAR_BACKGROUND, button.state),
          pixels,
          x,
          y,
          null
        );
        break;
      default:
        break;
    }
  });

  /* Border */
  drawLine(
    titleBar.pixels,
    0,
    titleBar.height - 1,
    screen.width,
    titleBar.height - 1,
    ScreenColour.TITLEBAR_BORDER
  );

  return pixels;
};
