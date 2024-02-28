import { windowContainerRender } from 'UIObjects/UIWindow/container/windowContainerRender';
import { ScreenColour } from 'constants/colours';
import {
  createPixelBuffer,
  drawImage,
  drawLine,
  drawPixelBuffer,
  drawText,
  fillRect,
} from 'functions/graphics';
import { IScreen } from 'interface/screen';
import { useIntuitionStore } from 'stores/useIntuitionStore';
import { screenContainerCalc } from './screenContainerCalc';
import { screenTitleBarRender } from './titleBar/screenTitleBarRender';

export const screenContainerRender = (screen: IScreen): IScreen => {
  const { guiIcons } = useIntuitionStore.getState();
  const { ctx } = screen;

  if (ctx === null) return screen;

  const calc = screenContainerCalc(screen);

  const titleBarObj = screenTitleBarRender(screen, calc);

  /* Title Bar */
  titleBarObj && drawPixelBuffer(screen.pixels, titleBarObj, 0, 0);

  /* Windows */
  screen.windows.map((window) => {
    windowContainerRender(screen, window);
  });

  /* Draw the screen */
  const imgData: ImageData = ctx.createImageData(screen.width, screen.height);
  let n = 0;
  for (let y = 0; y < screen.height; y++) {
    for (let x = 0; x < screen.width; x++) {
      const pixelIndex = screen.pixels[y][x];
      const color = screen.palette[pixelIndex];
      for (let i = 0; i < 4; i++) {
        imgData.data[n * 4 + i] = color[i];
      }
      n++;
    }
  }
  ctx.putImageData(imgData, screen.offset.x, screen.offset.y);
  return screen;
};
