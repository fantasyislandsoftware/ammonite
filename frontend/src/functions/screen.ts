import { IScreen } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';
import {
  fillRect,
  drawText,
  loadGuiIcons,
  drawImage,
  drawPixel,
} from './graphics';

export const screenIdToIndex = (id: number | undefined): number | undefined => {
  const { screens } = useScreenStore.getState();
  let result;
  screens.map((screen: IScreen, index: number) => {
    if (screen.id === id) result = index;
  });
  return result;
};

export const getHighestScreenZIndex = () => {
  const { screens } = useScreenStore.getState();
  return Math.max.apply(
    null,
    screens.map((v) => v.zIndex)
  );
};

export const getLowestScreenZIndex = () => {
  const { screens } = useScreenStore.getState();
  return Math.min.apply(
    null,
    screens.map((v) => v.zIndex)
  );
};

export const renderScreen = (screen: IScreen): IScreen => {
  const { ctx } = screen;

  if (ctx === null) return screen;

  loadGuiIcons().then((icons) => {
    if (screen.titleBar) {
      const barHeight = screen.titleBar.height;
      fillRect(screen, 0, 0, screen.width, barHeight, 1);
      fillRect(screen, 0, barHeight, screen.width, 1, 0);
      drawText(
        screen,
        screen.titleBar.title,
        0,
        0,
        `${screen.titleBar.font.size}px ${screen.titleBar.font.name}`,
        1,
        0
      );
      screen.titleBar.icons.map((icon, index) => {
        const imageIndex = icon.imageIndex[icon.currentImageIndex];
        icon.boundBox = {
          x: screen.width - index * barHeight - barHeight,
          y: 0,
          width: barHeight,
          height: barHeight,
        };
        drawImage(
          screen,
          icons[screen.titleBar ? imageIndex : 0],
          icon.boundBox.x,
          icon.boundBox.y,
          icon.boundBox.width,
          icon.boundBox.height
        );
      });
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
    ctx.putImageData(imgData, screen.offset.x, screen.offset.y);
    return screen;
  });
  //setScreen(screen);
  return screen;
};

export const setScreen = (_screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  screens.map((screen, index) => {
    if (screen.id === _screen.id) {
      screens[index] = _screen;
    }
  });
  setScreens(screens);
};
