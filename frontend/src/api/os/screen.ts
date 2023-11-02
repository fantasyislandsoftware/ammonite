import { initPixelArray } from 'functions/graphics';
import {
  getHighestScreenZIndex,
  getLowestScreenZIndex,
} from 'functions/screen';
import { EnumButtonFunction } from 'interface/icon';
import { IScreen, IScreenMode } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';
import { generateDefaultColorPalette } from 'uiObjects/Screen/palettes';
import { v4 as uuidv4 } from 'uuid';

export const openScreen = (
  width: number,
  height: number,
  mode: IScreenMode,
  title: string | null
) => {
  const { screens, setScreens, nextAvailableScreenId } =
    useScreenStore.getState();

  const nextScreenIndex = screens.length ? getHighestScreenZIndex() + 1 : 100;

  const titleBar = title
    ? {
        title: title,
        height: 0,
        font: {
          name: 'Arial',
          size: 12,
        },
        buttons: [
          {
            id: uuidv4(),
            name: EnumButtonFunction.close,
            imageIndex: [4, 5],
            currentImageIndex: 0,
            boundBox: {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            },
          },
          {
            id: uuidv4(),
            name: EnumButtonFunction.order,
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
            id: uuidv4(),
            name: EnumButtonFunction.maximize,
            imageIndex: [2, 3],
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

export const screenBringToFront = (screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  const screenIndex = screens.findIndex((s) => s.id === screen.id);
  let pos = 100;
  screens.map((_screen) => {
    if (_screen.id !== screen?.id) {
      _screen.zIndex = pos;
      pos++;
    }
  });
  screens[screenIndex].zIndex = pos;
  setScreens(screens);
};

export const screenSendToBack = (screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  const screenIndex = screens.findIndex((s) => s.id === screen.id);
  let pos = getHighestScreenZIndex();
  screens.map((_screen) => {
    if (_screen.id !== screen?.id) {
      _screen.zIndex = pos;
      pos--;
    }
  });
  screens[screenIndex].zIndex = pos;
  setScreens(screens);
};
