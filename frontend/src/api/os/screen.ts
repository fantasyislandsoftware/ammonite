import { initPixelArray } from 'functions/graphics';
import {
  getHighestScreenZIndex,
  getLowestScreenZIndex,
} from 'functions/screen';
import { EnumButtonFunction } from 'interface/icon';
import { IButton } from 'interface/intuition';
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

  const closeButton = () => {
    const obj = new Object() as IButton;
    obj.id = uuidv4();
    obj.name = EnumButtonFunction.close;
    obj.imageIndex = [4, 5];
    obj.currentImageIndex = 0;
    obj.boundBox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  };

  const orderButton = () => {
    const obj = new Object() as IButton;
    obj.id = uuidv4();
    obj.name = EnumButtonFunction.order;
    obj.imageIndex = [0, 1];
    obj.currentImageIndex = 0;
    obj.boundBox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    return obj;
  };

  const maximizeButton = () => {
    const obj = new Object() as IButton;
    obj.id = uuidv4();
    obj.name = EnumButtonFunction.maximize;
    obj.imageIndex = [2, 3];
    obj.currentImageIndex = 0;
    obj.boundBox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    return obj;
  };

  const titleBar = title
    ? {
        title: title,
        height: 0,
        font: {
          name: 'Arial',
          size: 12,
        },
        buttons: [orderButton(), maximizeButton()],
      }
    : null;

  const testWindow = {
    position: {
      x: 50,
      y: 50,
    },
    width: 100,
    height: 50,
    titleBar: {
      title: 'Test Window',
      height: 20,
      font: {
        name: 'Arial',
        size: 12,
      },
      buttons: [orderButton()],
    },
    borderThickness: 1,
  };

  const newScreen: IScreen = {
    id: nextAvailableScreenId,
    position: {
      y: 0,
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
    windows: [testWindow],
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
