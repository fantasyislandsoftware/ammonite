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

  screen.palette.map((color, index) => {
    const s = 8;
    const x = index * s;
    drawFillRect(clientPixels, x + 1, 1, x + s, s, index);
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
