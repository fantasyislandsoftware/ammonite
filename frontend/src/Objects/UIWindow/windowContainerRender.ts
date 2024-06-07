import { windowClientRender } from './container/client/windowClientRender';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { windowTitleBarRender } from './container/titleBar/windowTitleBarRender';
import { IPixelArray } from 'interface/graphics';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';

export const windowContainerRender = (
  clientPixels: IPixelArray,
  screen: IScreen,
  window: IWindow
) => {
  windowTitleBarRender(screen, window);
  windowClientRender(window);

  return window.pixels;
};
