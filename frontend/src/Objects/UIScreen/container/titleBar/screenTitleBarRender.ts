import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { textOut } from 'functions/graphics/text';
import { drawFillRect, drawLine } from 'functions/graphics/draw';
import { maximizeButton, orderButton } from 'Objects/UIButton/props/buttons';
import { pixelMerge } from 'functions/graphics/pixelArray';
import { ScreenColour } from 'Objects/UIScreen/_props/screenColour';
import { IPixelArray } from 'functions/graphics/IGraphics';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { checkPaletteIndex } from 'functions/colour/colour';

export const screenTitleBarRender = (pixels: IPixelArray, screen: IScreen) => {
  const { titleBar } = screen;
  if (!titleBar) return pixels;

  drawFillRect(
    titleBar.pixels,
    0,
    0,
    screen.width,
    titleBar.height,
    checkPaletteIndex(ScreenColour.TITLEBAR_BACKGROUND, screen.palette)
  );

  /* Title */
  textOut(
    titleBar.pixels,
    0,
    0,
    titleBar.title,
    checkPaletteIndex(ScreenColour.TITLEBAR_TEXT, screen.palette),
    checkPaletteIndex(ScreenColour.TITLEBAR_BACKGROUND, screen.palette),
    titleBar.font.name,
    titleBar.font.size
  );

  /* Buttons */
  screen.titleBar?.buttons.map((button) => {
    const { x, y, w, h } = button;

    switch (button.type) {
      case EnumButtonType.ORDER:
        pixels = pixelMerge(
          orderButton(
            screen.palette,
            w,
            h,
            checkPaletteIndex(ScreenColour.TITLEBAR_BACKGROUND, screen.palette),
            button.state
          ),
          pixels,
          x,
          y,
          null
        );
        break;
      case EnumButtonType.MAXIMIZE:
        pixels = pixelMerge(
          maximizeButton(
            screen.palette,
            w,
            h,
            checkPaletteIndex(ScreenColour.TITLEBAR_BACKGROUND, screen.palette),
            button.state
          ),
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
    checkPaletteIndex(
      checkPaletteIndex(ScreenColour.TITLEBAR_BORDER, screen.palette),
      screen.palette
    )
  );

  return pixels;
};
