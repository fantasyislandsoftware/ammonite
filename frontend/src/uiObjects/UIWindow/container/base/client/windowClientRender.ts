import { WindowColour } from 'constants/colours';
import { createPixelBuffer } from 'functions/graphics';
import { IWindow } from 'UIObjects/UIWindow/windowInterface';
import { IWindowContainerCalc } from '../../windowContainerCalc';

export const windowClientRender = (
  window: IWindow,
  calc: IWindowContainerCalc
) => {
  const { width, height, borderThickness } = window;
  const { height: barHeight } = calc.titleBar;
  const client = createPixelBuffer(
    width - borderThickness * 2,
    height - barHeight - borderThickness * 2,
    WindowColour.CLIENT
  );
  return client;
};
