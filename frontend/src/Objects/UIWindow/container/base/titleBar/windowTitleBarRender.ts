import { IWindow } from 'Objects/UIWindow/windowInterface';
import { IWindowContainerCalc } from '../../windowContainerCalc';
import { WindowColour } from 'Objects/UIWindow/windowColour';

export const windowTitleBarRender = (
  window: IWindow,
  calc: IWindowContainerCalc
) => {
  const { titleBar } = window;
  const { title, font } = titleBar;
  const { height: barHeight } = calc.titleBar;
  const barWidth = window.width - 2;
  /*const bar = createPixelBuffer(
    barWidth,
    barHeight,
    WindowColour.TITLEBAR_BACKGROUND
  );*/
  /*drawText(
    bar,
    title,
    font.name,
    font.size,
    0,
    0,
    WindowColour.TITLEBAR_BACKGROUND,
    WindowColour.TITLEBAR_TEXT
  );
  drawLine(bar, 0, barHeight - 1, barWidth, barHeight - 1, WindowColour.BORDER);*/
  //return bar;
};
