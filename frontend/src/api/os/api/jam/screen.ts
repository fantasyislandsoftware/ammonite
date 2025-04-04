import {
  IScreen,
  IScreenColors,
  IScreenMode,
} from 'Objects/UIScreen/_props/screenInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { ITask } from 'stores/useTaskStore';
import {
  low,
  med,
  hi,
  interlaced,
  full,
} from 'Objects/UIScreen/_props/screenModes';
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
  /****************************************************/

  public LOW: IScreenMode = low;
  public MED: IScreenMode = med;
  public HI: IScreenMode = hi;
  public INTERLACED: IScreenMode = interlaced;
  public FULL: IScreenMode = full;
  public screens: IScreen[] = [];
  public setScreens: (screens: IScreen[]) => void;

  /****************************************************/

  constructor() {
    const { screens, setScreens } = useScreenStore.getState();
    this.screens = screens;
    this.setScreens = setScreens;
  }

  /****************************************************/

  openScreen = async (
    task: ITask,
    props: {
      id: string | null;
      x: number;
      y: number;
      width: number;
      height: number;
      depth: IScreenColors;
      mode: IScreenMode;
      title: string | null;
      dpen: number;
      bpen: number;
      bitmap?: number;
      ret: string;
    }
  ) => {
    if (!task || !task.res) return;

    const { id, x, y, width, height, depth, mode, title, ret } = props;

    const { screens, setScreens } = useScreenStore.getState();

    const nextScreenIndex = screens.length ? getHighestScreenZIndex() + 1 : 100;

    let { height: titleBarHeight } = measureText(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=',
      screenDefault.titleBar.font.name,
      screenDefault.titleBar.font.size
    );

    titleBarHeight += 1;

    const screenId = !id ? uuidv4() : id;

    /* Buttons */
    const buttonSize = Math.round(titleBarHeight / 2) * 2 - 2;
    const buttons = generateBarIcons(
      [
        {
          type: EnumButtonType.ORDER,
          func: () => {
            this.reorderScreen(null, { screenId: screenId });
          },
        },
        {
          type: EnumButtonType.MAXIMIZE,
          func: () => {
            this.maximizeScreen(null, { screenId: screenId });
          },
        },
      ],
      buttonSize,
      width
    );

    const data: IScreen = {
      screenId: screenId,
      parentTaskId: task.id,
      object: EnumUIObjectType.SCREEN,
      position: {
        y: 0,
        z: 0,
      },
      mode: mode,
      width: width,
      height: height,
      offset: {
        x: x,
        y: y,
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
      palette: generateDefaultColorPalette(depth),
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

    task.var[ret] = screenId;
    return data;
  };

  /****************************************************/

  closeScreen = async (task = null, props: { screenId: string }) => {
    const { screenId } = props;
    const screenIndex = await this.findScreenIndex(null, {
      screenId: screenId,
    });
    this.screens.splice(screenIndex, 1);
    this.setScreens(this.screens);
  };

  /****************************************************/

  maximizeScreen = async (task = null, props: { screenId: string }) => {
    const { screenId } = props;
    const screenIndex = await this.findScreenIndex(null, {
      screenId: screenId,
    });
    this.screens[screenIndex].position.y = 0;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/

  bringToFront = async (task = null, props: { screenId: string }) => {
    const { screenId } = props;
    const screenIndex = await this.findScreenIndex(null, {
      screenId: screenId,
    });
    let pos = 100;
    if (await this.isTopScreen(null, { screenId: screenId })) return;
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

  sendToBack = async (task = null, props: { screenId: string }) => {
    const { screenId } = props;
    const screenIndex = await this.findScreenIndex(null, {
      screenId: screenId,
    });
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

  isTopScreen = async (task = null, props: { screenId: string }) => {
    const { screenId } = props;
    const screenIndex = await this.findScreenIndex(null, {
      screenId: screenId,
    });
    const highestZIndex = await getHighestScreenZIndex();
    return this.screens[screenIndex].zIndex === highestZIndex;
  };

  /****************************************************/

  reorderScreen = async (task = null, props: { screenId: string }) => {
    const { screenId } = props;
    if (STATE.screenChangeMode === 'changing') return;
    const screenIndex = await this.findScreenIndex(null, {
      screenId: screenId,
    });
    const highestZIndex = await getHighestScreenZIndex();
    if (this.screens[screenIndex].zIndex === (await highestZIndex)) {
      this.sendToBack(null, { screenId: screenId });
    }
  };

  /****************************************************/

  findScreenIndex = async (task = null, props: { screenId: string }) => {
    const { screenId } = props;
    const { screens } = useScreenStore.getState();
    return screens.findIndex((s) => s.screenId === screenId);
  };

  /****************************************************/

  setTitle = async (
    task = null,
    props: { screenId: string; title: string }
  ) => {
    const { screenId, title } = props;
    const screenIndex = await this.findScreenIndex(null, {
      screenId: screenId,
    });
    this.screens[screenIndex].titleBar!.title = title;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/

  setSelectedWindow = async (
    task = null,
    props: {
      screenId: string;
      windowId: string | undefined;
    }
  ) => {
    const { screenId, windowId } = props;
    const screenIndex = await this.findScreenIndex(null, {
      screenId: screenId,
    });
    this.screens[screenIndex].selectedWindowId = windowId;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/
}
