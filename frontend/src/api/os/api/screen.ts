import { useScreenStore } from 'stores/useScreenStore';
import {
  getHighestScreenZIndex,
  setScreen,
} from 'Objects/UIScreen/_props/screenFunctions';
import { IScreen, IScreenMode } from 'Objects/UIScreen/_props/screenInterface';
import { measureText } from 'api/lib/graphics/text';
import { screenDefault } from 'Objects/UIScreen/_props/screenDefault';
import { v4 as uuidv4 } from 'uuid';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { ScreenColour } from 'Objects/UIScreen/_props/screenColour';
import { generateDefaultColorPalette } from 'Objects/UIScreen/_props/palettes';

export class SCREEN_API {
  public screens: IScreen[] = [];
  public setScreens: (screens: IScreen[]) => void;

  /****************************************************/

  constructor() {
    const { screens, setScreens } = useScreenStore.getState();
    this.screens = screens;
    this.setScreens = setScreens;
  }

  /****************************************************/

  openScreen = (
    parentTaskId: string,
    width: number,
    height: number,
    mode: IScreenMode,
    title: string | null
  ) => {
    const { screens, setScreens } = useScreenStore.getState();

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
          func: `screenAPI.reorderScreen('${screenId}')`,
        },
        {
          type: EnumButtonType.MAXIMIZE,
          func: `screenAPI.maximizeScreen('${screenId}')`,
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

  /****************************************************/

  maximizeScreen = (screenId: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    this.screens[screenIndex].position.y = 0;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/

  bringToFront = (screenId: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    let pos = 100;
    this.screens.map((_screen) => {
      if (_screen.screenId !== screenId) {
        _screen.zIndex = pos;
        pos++;
      }
    });
    this.screens[screenIndex].zIndex = pos;
    this.setScreens(this.screens);
  };

  /****************************************************/

  sendToBack = (screenId: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    let pos = getHighestScreenZIndex();
    this.screens.map((_screen) => {
      if (_screen.screenId !== screenId) {
        _screen.zIndex = pos;
        pos--;
      }
    });
    this.screens[screenIndex].zIndex = pos;
    this.setScreens(this.screens);
  };

  /****************************************************/

  isTopScreen = (screenId: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    return this.screens[screenIndex].zIndex === getHighestScreenZIndex();
  };

  /****************************************************/

  reorderScreen = (screenId: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    if (this.screens[screenIndex].zIndex === getHighestScreenZIndex()) {
      this.sendToBack(screenId);
    }
  };

  /****************************************************/

  findScreenIndex = (id: string) => {
    const { screens } = useScreenStore.getState();
    return screens.findIndex((s) => s.screenId === id);
  };

  /****************************************************/
}
