import { IScreen } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';
import {
  fillRect,
  drawText,
  loadGuiIcons,
  drawPixel,
  initPixelArray,
  createPixelBuffer,
  drawPixelBuffer,
  drawLine,
  drawImage,
} from './graphics';
import { useIntuitionStore } from 'stores/useIntuitionStore';
import { renderWindow } from './window';

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
  const { guiIcons } = useIntuitionStore.getState();
  const { ctx } = screen;

  if (ctx === null) return screen;

  /* Title Bar */
  if (screen.titleBar) {
    const barHeight = screen.titleBar.height;

    const bar = createPixelBuffer(screen.width, barHeight);
    fillRect(bar, 0, 0, screen.width, barHeight, 1);
    drawText(
      bar,
      screen.titleBar.title,
      `${screen.titleBar.font.size}px ${screen.titleBar.font.name}`,
      0,
      0,
      1,
      0
    );
    drawLine(bar, 0, barHeight - 1, screen.width, barHeight - 1, 0);

    /* Buttons */
    screen.titleBar.buttons.map((button, index) => {
      const imageIndex = button.imageIndex[button.currentImageIndex];
      button.boundBox = {
        x: screen.width - index * barHeight - barHeight,
        y: 0,
        width: barHeight,
        height: barHeight,
      };
      drawImage(
        bar,
        guiIcons[screen.titleBar ? imageIndex : 0],
        button.boundBox.x,
        button.boundBox.y,
        button.boundBox.width,
        button.boundBox.height
      );
    });

    drawPixelBuffer(screen.pixels, bar, 0, 0);
  }

  /* Windows */
  screen.windows.map((window) => {
    renderWindow(screen, window);
  });

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

export const setScreen = (_screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  screens.map((screen, index) => {
    if (screen.id === _screen.id) {
      screens[index] = _screen;
    }
  });
  setScreens(screens);
};
