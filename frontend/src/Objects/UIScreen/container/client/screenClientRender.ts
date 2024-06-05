import { ScreenColour } from 'Objects/UIScreen/_props/screenColour';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { windowContainerRender } from 'Objects/UIWindow/windowContainerRender';
import { drawFillRect } from 'api/lib/graphics/draw';
import {
  getPixelArrayDimensions,
  pixelMerge,
} from 'api/lib/graphics/pixelArray';
import { WINDOW_API } from 'api/os/api/window';
import { get } from 'http';
import { IPixelArray } from 'interface/graphics';

export const screenClientRender = (
  clientPixels: IPixelArray,
  screen: IScreen
) => {
  const windowAPI = new WINDOW_API();

  const { width, height } = getPixelArrayDimensions(clientPixels);

  const windows = windowAPI.sortWindowsByZIndex(screen.windows);

  drawFillRect(clientPixels, 0, 0, width, height, ScreenColour.CLIENT);

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
