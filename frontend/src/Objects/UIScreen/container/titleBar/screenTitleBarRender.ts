import { IScreenContainerCalc } from '../screenContainerCalc';
import {
  createPixelBuffer,
  drawLine,
  drawText,
  fillRect,
} from 'functions/graphics';
import { ScreenColour } from 'constants/colours';
import { IScreen } from 'Objects/UIScreen/screenInterface';
import { useFontStore } from 'stores/useFontStore';

export const screenTitleBarRender = (
  screen: IScreen,
  calc: IScreenContainerCalc | null
) => {
  const { fonts } = useFontStore.getState();
  console.log(fonts);

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
    titleBar.font.name,
    barHeight,
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
