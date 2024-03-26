import { ScreenColour } from 'constants/colours';
import { getHighestScreenZIndex } from 'functions/screen';
import { EnumButtonFunction } from 'interface/icon';
import { IButton } from 'interface/intuition';
import { useScreenStore } from 'stores/useScreenStore';
import { generateDefaultColorPalette } from '../../Objects/UIScreen/palettes';
import { IScreen, IScreenMode } from '../../Objects/UIScreen/screenInterface';
import { v4 as uuidv4 } from 'uuid';
import { screenDefault } from 'Objects/UIScreen/screenDefault';
import { measureText } from 'api/lib/graphics/text';
import { initPixelArray } from 'api/lib/graphics/pixelArray';

export const openScreen = (
  parentTaskId: string,
  width: number,
  height: number,
  mode: IScreenMode,
  title: string | null
) => {
  const { screens, setScreens, setSelectedScreen } = useScreenStore.getState();

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

  const { height: titleBarHeight } = measureText(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=',
    screenDefault.titleBar.font.name,
    screenDefault.titleBar.font.size
  );

  const screenId = uuidv4();

  const data: IScreen = {
    screenId: screenId,
    parentTaskId: parentTaskId,
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
    titleBar: title
      ? {
          title: title,
          height: titleBarHeight,
          font: screenDefault.titleBar.font,
          buttons: [orderButton(), maximizeButton()],
          pixels: initPixelArray(
            width,
            titleBarHeight,
            ScreenColour.TITLEBAR_BACKGROUND
          ),
        }
      : null,
    numberOfColours: 16,
    palette: generateDefaultColorPalette(16),
    ctx: null,
    pixels: initPixelArray(width, height, ScreenColour.BORDER),
    margin: 0,
    zIndex: nextScreenIndex,
    aspect: {
      width: 0,
      height: 0,
      margin: 0,
    },
    client: {
      pixels: initPixelArray(
        width,
        height - titleBarHeight,
        ScreenColour.CLIENT
      ),
    },

    windows: [],
  };
  screens.push(data);
  setScreens(screens);
  setTimeout(() => {
    setSelectedScreen(undefined);
  });
  return screenId;
};

export const screenBringToFront = (screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  const screenIndex = screens.findIndex((s) => s.screenId === screen.screenId);
  let pos = 100;
  screens.map((_screen) => {
    if (_screen.screenId !== screen?.screenId) {
      _screen.zIndex = pos;
      pos++;
    }
  });
  screens[screenIndex].zIndex = pos;
  setScreens(screens);
};

export const screenSendToBack = (screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  const screenIndex = screens.findIndex((s) => s.screenId === screen.screenId);
  let pos = getHighestScreenZIndex();
  screens.map((_screen) => {
    if (_screen.screenId !== screen?.screenId) {
      _screen.zIndex = pos;
      pos--;
    }
  });
  screens[screenIndex].zIndex = pos;
  setScreens(screens);
};

export const findScreenIndex = (id: string) => {
  const { screens } = useScreenStore.getState();
  return screens.findIndex((s) => s.screenId === id);
};
