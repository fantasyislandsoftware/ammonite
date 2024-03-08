import { IWindow } from 'Objects/UIWindow/windowInterface';
import {
  createPixelBuffer,
  drawLine,
  drawText,
  fillRect,
} from '../../../../../functions/graphics';
import { WindowColour } from 'constants/colours';
import { IWindowContainerCalc } from '../../windowContainerCalc';

export const windowTitleBarRender = (
  window: IWindow,
  calc: IWindowContainerCalc
) => {
  const { titleBar } = window;
  const { title, font } = titleBar;
  const { width: barWidth, height: barHeight } = calc.titleBar;
  const bar = createPixelBuffer(
    barWidth,
    barHeight,
    WindowColour.TITLEBAR_BACKGROUND
  );
  fillRect(bar, 0, 0, barWidth, barHeight, WindowColour.TITLEBAR_BACKGROUND);
  drawText(
    bar,
    title,
    `${font.size}px ${font.name}`,
    1,
    0,
    WindowColour.TITLEBAR_BACKGROUND,
    WindowColour.TITLEBAR_TEXT
  );
  drawLine(bar, 0, barHeight - 1, barWidth, barHeight - 1, WindowColour.BORDER);
  return bar;
};
