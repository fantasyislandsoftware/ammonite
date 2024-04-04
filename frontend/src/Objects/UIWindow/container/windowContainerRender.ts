import { useIntuitionStore } from 'stores/useIntuitionStore';
import { windowContainerCalc } from './windowContainerCalc';
import { windowClientRender } from './base/client/windowClientRender';
import { IWindow } from 'Objects/UIWindow/windowInterface';
import { windowTitleBarRender } from './base/titleBar/windowTitleBarRender';
import { IPixelArray, IPixelBuffer } from 'interface/graphics';
import { IScreen } from 'Objects/UIScreen/screenInterface';

export const windowContainerRender = (
  target: IPixelBuffer,
  screen: IScreen,
  window: IWindow
) => {
  const { guiIcons } = useIntuitionStore.getState();
  const { width, height, titleBar, position, borderThickness } = window;
  const { x, y } = position;

  /* Pre-Calc */
  const calc = windowContainerCalc(window);
  //const { height: barHeight } = calc.titleBar;

  /* Create window buffer */
  //const win = createPixelBuffer(width, height, 0);

  /* Render window components */
  //const titleBarObj = windowTitleBarRender(window, calc);
  //const clientObj = windowClientRender(window, calc);

  /* Draw window components */
  //drawPixelBuffer(win.pixels, titleBarObj, borderThickness, borderThickness);
  /*drawPixelBuffer(
    win.pixels,
    clientObj,
    borderThickness,
    barHeight + borderThickness
  );*/

  /* Draw window on screen */
  //drawPixelBuffer(target.pixels, win, x, y);

  /* Adjust window properties */
  //window.titleBar.height = barHeight;
};
