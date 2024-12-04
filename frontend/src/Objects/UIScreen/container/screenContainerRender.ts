import { pixelMerge } from 'functions/graphics/pixelArray';
import { IScreen } from '../_props/screenInterface';
import { screenTitleBarRender } from './titleBar/screenTitleBarRender';
import { screenClientRender } from './client/screenClientRender';

export const screenContainerRender = (screen: IScreen): IScreen => {
  const { ctx, titleBar, client } = screen;

  if (ctx === null) return screen;

  /* Title Bar */
  if (titleBar) {
    titleBar.pixels = screenTitleBarRender(titleBar.pixels, screen);
    screen.pixels = pixelMerge(titleBar.pixels, screen.pixels, 0, 0, null);
  }

  /* Client */
  client.pixels = screenClientRender(client.pixels, screen);
  screen.pixels = pixelMerge(
    client.pixels,
    screen.pixels,
    0,
    titleBar?.height || 0,
    null
  );

  /* Render Screen */
  const imgData: ImageData = ctx.createImageData(screen.width, screen.height);
  let n = 0;

  for (let y = 0; y < screen.height; y++) {
    for (let x = 0; x < screen.width; x++) {
      const pixelIndex = screen.pixels[y][x];
      const color = screen.palette[pixelIndex];
      for (let i = 0; i < 4; i++) {
        const p = n * 4 + i;
        try {
          if (imgData.data[p] !== color[i]) {
            imgData.data[p] = color[i];
          }
        } catch (e) {
          () => {};
        }
      }
      n++;
    }
  }
  ctx.putImageData(imgData, screen.offset.x, screen.offset.y);
  return screen;
};
