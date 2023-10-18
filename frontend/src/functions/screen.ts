import { IScreen } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';
import {
  fillRect,
  drawText,
  loadGuiIcons,
  drawImage,
  drawPixel,
} from './graphics';

export const screenIdToIndex = (id: number): number | undefined => {
  const { screens } = useScreenStore.getState();
  let result;
  screens.map((screen: IScreen, index: number) => {
    if (screen.id === id) result = index;
  });
  return result;
};

export const getHighestScreenZIndex = () => {
  const { screens } = useScreenStore.getState();
  let result = 0;
  screens.map((screen) => {
    if (screen.zIndex > result) result = screen.zIndex;
  });
  return result;
};

export const renderScreen = (screen: IScreen) => {
  const { ctx } = screen;

  if (ctx === null) return;

  loadGuiIcons().then((icon) => {
    if (screen.titleBar) {
      fillRect(screen, 0, 0, screen.width, screen.titleBar.height, 1);
      fillRect(screen, 0, screen.titleBar.height, screen.width, 1, 0);
      drawText(
        screen,
        screen.titleBar.title,
        0,
        0,
        `${screen.titleBar.font.size}px ${screen.titleBar.font.name}`,
        1,
        0
      );
      drawImage(screen, icon, 40, 40);
    }

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
    /*for (let n = 0; n < screen.pixels.length; n++) {
      const pixelIndex = screen.pixels[n];
      const color = screen.palette[pixelIndex];
      for (let i = 0; i < 4; i++) {
        imgData.data[n * 4 + i] = color[i];
        //imgData.data[n * 4 + i] = Math.floor(Math.random() * 255);
      }
    }*/
    ctx.putImageData(imgData, screen.offset.x, screen.offset.y);
  });
};
