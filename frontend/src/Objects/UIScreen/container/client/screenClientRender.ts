import { ScreenColour } from 'Objects/UIScreen/_props/screenColour';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { windowContainerRender } from 'Objects/UIWindow/windowContainerRender';
import { drawFillRect } from 'functions/graphics/draw';
import {
  getPixelArrayDimensions,
  pixelMerge,
} from 'functions/graphics/pixelArray';
import { JAM_WINDOW } from 'api/os/api/jam/window';
import { IPixelArray } from 'functions/graphics/IGraphics';
import { checkPaletteIndex } from 'functions/colour/colour';

export const screenClientRender = (
  clientPixels: IPixelArray,
  screen: IScreen
) => {
  const jam_window = new JAM_WINDOW();

  const { width, height } = getPixelArrayDimensions(clientPixels);

  const windows = jam_window.sortWindowsByZIndex(null, {
    windows: screen.windows,
  });

  drawFillRect(
    clientPixels,
    0,
    0,
    width,
    height,
    checkPaletteIndex(ScreenColour.CLIENT, screen.palette)
  );

  let px = 0;
  let py = 0;
  let pi = 0;
  const ps = 4;
  screen.palette.map((color, index) => {
    drawFillRect(clientPixels, px + 1, py + 1, px + ps, py + ps, index);
    px += ps;
    pi++;
    if (pi > 15) {
      pi = 0;
      px = 0;
      py += ps;
    }
  });

  windows.map((window) => {
    const windowPixels = windowContainerRender(clientPixels, screen, window);
    clientPixels = pixelMerge(
      windowPixels,
      clientPixels,
      window.position.x,
      window.position.y,
      null
    );
  });

  return clientPixels;
};
