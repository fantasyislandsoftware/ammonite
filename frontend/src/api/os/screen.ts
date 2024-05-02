import { useScreenStore } from 'stores/useScreenStore';
import { generateDefaultColorPalette } from '../../Objects/UIScreen/_props/palettes';
import {
  IScreen,
  IScreenMode,
} from '../../Objects/UIScreen/_props/screenInterface';
import { v4 as uuidv4 } from 'uuid';
import { screenDefault } from 'Objects/UIScreen/_props/screenDefault';
import { measureText } from 'api/lib/graphics/text';
import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { ScreenColour } from 'Objects/UIScreen/_props/screenColour';
import { getHighestScreenZIndex } from 'Objects/UIScreen/_props/screenFunctions';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';

export const openScreen = (
  parentTaskId: string,
  width: number,
  height: number,
  mode: IScreenMode,
  title: string | null
) => {
  const { screens, setScreens, setSelectedScreen } = useScreenStore.getState();

  const nextScreenIndex = screens.length ? getHighestScreenZIndex() + 1 : 100;

  let { height: titleBarHeight } = measureText(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=',
    screenDefault.titleBar.font.name,
    screenDefault.titleBar.font.size
  );

  titleBarHeight += 1;

  const screenId = uuidv4();

  /* Buttons */
  const buttonSize = Math.round(titleBarHeight / 2) * 2 - 2;
  const buttons = generateBarIcons(
    [
      {
        type: EnumButtonType.ORDER,
        func: `screen.reorderScreen('${screenId}')`,
      },
      {
        type: EnumButtonType.MAXIMIZE,
        func: `screen.maximizeScreen('${screenId}')`,
      },
    ],
    buttonSize,
    width
  );

  const data: IScreen = {
    screenId: screenId,
    parentTaskId: parentTaskId,
    object: EnumUIObjectType.SCREEN,
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
          buttons: buttons,
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
  return screenId;
};

export const findScreenIndex = (id: string) => {
  const { screens } = useScreenStore.getState();
  return screens.findIndex((s) => s.screenId === id);
};
