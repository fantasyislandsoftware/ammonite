import { IScreen, IScreenMode } from 'Objects/UIScreen/_props/screenInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { ITask } from 'stores/useTaskStore';
import { low } from 'Objects/UIScreen/_props/screenModes';
import {
  getHighestScreenZIndex,
  setScreen,
} from 'Objects/UIScreen/_props/screenFunctions';
import { measureText } from 'functions/graphics/text';
import { screenDefault } from 'Objects/UIScreen/_props/screenDefault';
import { v4 as uuidv4 } from 'uuid';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { initPixelArray } from 'functions/graphics/pixelArray';
import { ScreenColour } from 'Objects/UIScreen/_props/screenColour';
import { generateDefaultColorPalette } from 'Objects/UIScreen/_props/palettes';
import { STATE } from 'constants/globals/state';
import { processScreenChange } from 'functions/events/events';

export class JAM_SCREEN {
  private self: ITask | undefined;
  public low: IScreenMode = low;
  public screens: IScreen[] = [];
  public setScreens: (screens: IScreen[]) => void;

  /****************************************************/

  constructor(self?: ITask) {
    this.self = self;
    const { screens, setScreens } = useScreenStore.getState();
    this.screens = screens;
    this.setScreens = setScreens;
  }

  /****************************************************/

  openScreen = async (
    parentTaskId: string,
    width: number,
    height: number,
    mode: IScreenMode,
    title: string | null,
    returnId: string
  ) => {
    if (!this.self) return;
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
          func: `jam_screen.reorderScreen('${screenId}')`,
        },
        {
          type: EnumButtonType.MAXIMIZE,
          func: `jam_screen.maximizeScreen('${screenId}')`,
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
      selectedWindowId: undefined,
    };
    screens.push(data);

    setScreens(screens);
    setTimeout(() => {
      setScreen(data);
    });

    STATE.currentScreenId = screenId;

    this.self.var[returnId] = screenId;
  };

  /****************************************************/

  maximizeScreen = async (screenId: string) => {
    const screenIndex = await this.findScreenIndex(screenId);
    this.screens[screenIndex].position.y = 0;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/

  bringToFront = async (screenId: string) => {
    const screenIndex = await this.findScreenIndex(screenId);
    let pos = 100;
    if (await this.isTopScreen(screenId)) return;
    this.screens.map((_screen) => {
      if (_screen.screenId !== screenId) {
        _screen.zIndex = pos;
        pos++;
        processScreenChange();
      }
    });
    this.screens[screenIndex].zIndex = pos;
    this.setScreens(this.screens);
  };

  /****************************************************/

  sendToBack = async (screenId: string) => {
    const screenIndex = await this.findScreenIndex(screenId);
    let pos = getHighestScreenZIndex();
    this.screens.map((_screen) => {
      if (_screen.screenId !== screenId) {
        _screen.zIndex = pos;
        pos--;
      }
    });
    this.screens[screenIndex].zIndex = pos;
    this.setScreens(this.screens);
    processScreenChange();
  };

  /****************************************************/

  isTopScreen = async (screenId: string) => {
    const screenIndex = await this.findScreenIndex(screenId);
    const highestZIndex = await getHighestScreenZIndex();
    return this.screens[screenIndex].zIndex === highestZIndex;
  };

  /****************************************************/

  reorderScreen = async (screenId: string) => {
    if (STATE.screenChangeMode === 'changing') return;
    const screenIndex = await this.findScreenIndex(screenId);
    const highestZIndex = await getHighestScreenZIndex();
    if (this.screens[screenIndex].zIndex === (await highestZIndex)) {
      this.sendToBack(screenId);
    }
  };

  /****************************************************/

  findScreenIndex = async (id: string) => {
    const { screens } = useScreenStore.getState();
    return screens.findIndex((s) => s.screenId === id);
  };

  /****************************************************/

  setTitle = async (screenId: string, title: string) => {
    const screenIndex = await this.findScreenIndex(screenId);
    this.screens[screenIndex].titleBar!.title = title;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/

  setSelectedWindow = async (
    screenId: string,
    windowId: string | undefined
  ) => {
    const screenIndex = await this.findScreenIndex(screenId);
    this.screens[screenIndex].selectedWindowId = windowId;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/
}
