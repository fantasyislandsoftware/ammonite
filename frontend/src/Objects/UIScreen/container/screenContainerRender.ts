import { pixelMerge } from 'api/lib/graphics/pixelArray';
import { IScreen } from '../screenInterface';
import { screenTitleBarRender } from './titleBar/screenTitleBarRender';

export const screenContainerRender = (screen: IScreen): IScreen => {
  const { ctx, titleBar, client } = screen;

  if (ctx === null) return screen;

  /* Title Bar */
  if (titleBar) {
    titleBar.pixels = screenTitleBarRender(titleBar.pixels, screen);
    screen.pixels = pixelMerge(titleBar.pixels, screen.pixels, 0, 0);
  }

  /* Client */
  screen.pixels = pixelMerge(
    client.pixels,
    screen.pixels,
    0,
    titleBar?.height || 0
  );

  /* Render Screen */
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
