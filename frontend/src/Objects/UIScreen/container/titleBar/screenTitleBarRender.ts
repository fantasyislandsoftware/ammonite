import { IScreenContainerCalc } from '../screenContainerCalc';
import {
  createPixelBuffer,
  drawLine,
  drawText,
  fillRect,
} from 'functions/graphics';
import { ScreenColour } from 'constants/colours';
import { IScreen } from 'Objects/UIScreen/screenInterface';

export const screenTitleBarRender = (
  screen: IScreen,
  calc: IScreenContainerCalc | null
) => {
  const { titleBar } = screen;
  if (!titleBar) return null;

  if (calc === null) return null;
  const { height: barHeight } = calc.titleBar;

  /* Create buffer */
  const bar = createPixelBuffer(
    screen.width,
    barHeight,
    ScreenColour.TITLEBAR_BACKGROUND
  );

  /* Border */
  fillRect(
    bar,
    0,
    0,
    screen.width,
    barHeight,
    ScreenColour.TITLEBAR_BACKGROUND
  );

  drawText(
    bar,
    titleBar.title,
    `${titleBar.font.size}px ${titleBar.font.name}`,
    0,
    0,
    ScreenColour.TITLEBAR_BACKGROUND,
    ScreenColour.TITLEBAR_TEXT
  );
  drawLine(
    bar,
    0,
    barHeight - 1,
    screen.width,
    barHeight - 1,
    ScreenColour.BORDER
  );

  return bar;
};
