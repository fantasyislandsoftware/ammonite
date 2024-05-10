import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { windowContainerRender } from 'Objects/UIWindow/windowContainerRender';
import { pixelMerge } from 'api/lib/graphics/pixelArray';
import { WINDOW_API } from 'api/os/api/window';
import { IPixelArray } from 'interface/graphics';

export const screenClientRender = (
  clientPixels: IPixelArray,
  screen: IScreen
) => {
  const windowAPI = new WINDOW_API();

  const windows = windowAPI.sortWindowsByZIndex(screen.windows);

  windows.map((window) => {
    const x = windowContainerRender(clientPixels, screen, window);
    clientPixels = pixelMerge(
      x,
      clientPixels,
      window.position.x,
      window.position.y,
      null
    );
  });

  return clientPixels;
};
