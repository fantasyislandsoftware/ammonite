import { useIntuitionStore } from 'stores/useIntuitionStore';
import { windowContainerCalc } from './windowContainerCalc';
import { windowClientRender } from './base/client/windowClientRender';
import { IWindow } from 'Objects/UIWindow/windowInterface';
import { windowTitleBarRender } from './base/titleBar/windowTitleBarRender';
import { IPixelArray, IPixelBuffer } from 'interface/graphics';
import { IScreen } from 'Objects/UIScreen/screenInterface';
import { drawFillRect, drawLine } from 'api/lib/graphics/draw';
import { WindowColour } from '../windowColour';
import { windowBorderRender } from './border/windowBorderRender';

export const windowContainerRender = (
  clientPixels: IPixelArray,
  screen: IScreen,
  window: IWindow
) => {
  const { guiIcons } = useIntuitionStore.getState();
  const { width, height, titleBar, position, borderThickness } = window;
  const { x, y } = position;

  windowBorderRender(window);
  windowTitleBarRender(window);

  return window.pixels;
};
