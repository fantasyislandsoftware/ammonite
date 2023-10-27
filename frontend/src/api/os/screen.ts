import { initPixelArray } from 'functions/graphics';
import {
  getHighestScreenZIndex,
  getLowestScreenZIndex,
} from 'functions/screen';
import { IScreen, IScreenMode } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';
import { generateDefaultColorPalette } from 'uiObjects/Screen/palettes';

export const openScreen = (
  width: number,
  height: number,
  mode: IScreenMode,
  title: string | null
) => {
  const { screens, setScreens, nextAvailableScreenId } =
    useScreenStore.getState();

  const nextScreenIndex = screens.length ? getHighestScreenZIndex() + 1 : 1000;
  console.log(nextScreenIndex);

  const titleBar = title
    ? {
        title: title,
        height: 0,
        font: {
          name: 'Arial',
          size: 12,
        },
        icons: [
          {
            id: 'close',
            imageIndex: [0, 1],
            currentImageIndex: 0,
            boundBox: {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            },
          },
          {
            id: 'test',
            imageIndex: [0, 1],
            currentImageIndex: 0,
            boundBox: {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            },
          },
        ],
      }
    : null;

  const newScreen: IScreen = {
    id: nextAvailableScreenId,
    position: {
      y: 200,
      z: 0,
    },
    mode: mode,
    width: width,
    height: height,
    offset: {
      x: 0,
      y: 0,
    },
    titleBar: titleBar,
    numberOfColours: 16,
    palette: generateDefaultColorPalette(16),
    ctx: null,
    pixels: initPixelArray(width, height),
    margin: 0,
    zIndex: nextScreenIndex,
    aspect: {
      width: 0,
      height: 0,
      margin: 0,
    },
  };
  screens.push(newScreen);
  setScreens(screens);
};

export const screenBringToFront = (index: number) => {
  const { screens, setScreens } = useScreenStore.getState();
  const screen = screens[index];
  screen.zIndex = getHighestScreenZIndex() + 1;
  screens[index] = screen;
  setScreens(screens);
};

export const screenSendToBack = (index: number) => {
  const { screens, setScreens } = useScreenStore.getState();
  const screen = screens[index];
  screen.zIndex = getLowestScreenZIndex() - 1;
  screens[index] = screen;
  setScreens(screens);
};
