import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { windowContainerRender } from 'Objects/UIWindow/container/windowContainerRender';
import { pixelMerge } from 'api/lib/graphics/pixelArray';
import { IPixelArray } from 'interface/graphics';

export const screenClientRender = (
  clientPixels: IPixelArray,
  screen: IScreen
) => {
  screen.windows.map((window) => {
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
