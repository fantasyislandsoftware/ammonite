import { windowContainerRender } from '../../UIWindow/container/windowContainerRender';
import { drawPixelBuffer } from 'functions/graphics';
import { useIntuitionStore } from 'stores/useIntuitionStore';
import { screenContainerCalc } from './screenContainerCalc';
import { screenTitleBarRender } from './titleBar/screenTitleBarRender';
import { screenClientRender } from './client/screenClientRender';
import { IScreen } from '../screenInterface';

const pixelMerge = (
  from: number[][],
  to: number[][],
  offsetX: number,
  offsetY: number
) => {
  const width = from[0].length;
  const height = from.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      to[x + offsetX][y + offsetY] = from[x][y];
    }
  }
  return to;
};

export const screenContainerRender = (screen: IScreen): IScreen => {
  const { guiIcons } = useIntuitionStore.getState();
  const { ctx } = screen;

  if (ctx === null) return screen;

  const calc = screenContainerCalc(screen);

  const titleBarObj = screenTitleBarRender(screen, calc);
  const clientObj = screenClientRender(screen, calc);

  /* Add components */
  titleBarObj && drawPixelBuffer(screen.pixels, titleBarObj, 0, 0);
  //drawPixelBuffer(screen.pixels, screen.client.pixels, 0, calc!.titleBar.height);
  /*screen.windows.map((window) => {
    clientObj && windowContainerRender(clientObj, screen, window);
  });
  clientObj &&
    drawPixelBuffer(screen.pixels, clientObj, 0, calc!.titleBar.height);*/

  screen.pixels = pixelMerge(screen.client.pixels, screen.pixels, 10, 10);

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
