import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import {
  makeMaximizeButton,
  makeOrderButton,
} from 'Objects/UIButton/props/buttons';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { WindowColour } from 'Objects/UIWindow/_props/windowColour';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { drawFillRect } from 'functions/graphics/draw';
import {
  getPixelArrayDimensions,
  pixelMerge,
} from 'functions/graphics/pixelArray';
import { textOut } from 'functions/graphics/text';
import { VectorShape, drawVector } from 'functions/graphics/vector';
import { STATE } from 'constants/globals/state';

export const windowTitleBarRender = (screen: IScreen, window: IWindow) => {
  if (!window.titleBar) return;
  const { pixels: windowPixels, titleBar, windowId } = window;
  const { pixels: titleBarPixels, color, buttons } = titleBar;
  const { font, title } = titleBar;

  const { width, height } = getPixelArrayDimensions(titleBarPixels);

  const titleBarColour =
    window.windowId === screen.selectedWindowId
      ? WindowColour.TITLEBAR_BACKGROUND_SELECTED
      : WindowColour.TITLEBAR_BACKGROUND_NOT_SELECTED;

  /* Background */
  drawFillRect(titleBarPixels, 0, 0, width, height, titleBarColour);

  /* Title */
  textOut(
    titleBarPixels,
    0,
    0,
    title,
    color.text,
    titleBarColour,
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
