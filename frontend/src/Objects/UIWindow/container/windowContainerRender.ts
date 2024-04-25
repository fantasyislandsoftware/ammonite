import { useIntuitionStore } from 'stores/useIntuitionStore';
import { windowContainerCalc } from './windowContainerCalc';
import { windowClientRender } from './client/windowClientRender';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { windowTitleBarRender } from './titleBar/windowTitleBarRender';
import { IPixelArray, IPixelBuffer } from 'interface/graphics';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { drawFillRect, drawLine } from 'api/lib/graphics/draw';
import { WindowColour } from '../_props/windowColour';
import { windowBorderRender } from './border/windowBorderRender';

export const windowContainerRender = (
  clientPixels: IPixelArray,
  screen: IScreen,
  window: IWindow
) => {
  windowBorderRender(window);
  windowTitleBarRender(window);
  windowClientRender(window);

  return window.pixels;
};
