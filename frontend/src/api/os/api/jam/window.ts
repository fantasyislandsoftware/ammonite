import {
  getPixelArrayDimensions,
  initPixelArray,
} from 'functions/graphics/pixelArray';
import { measureText } from 'functions/graphics/text';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { WindowColour } from 'Objects/UIWindow/_props/windowColour';
import { windowDefault } from 'Objects/UIWindow/_props/windowDefault';
import {
  EWindowState,
  IWindow,
  IWindowClient,
  IWindowTitleBar,
} from 'Objects/UIWindow/_props/windowInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from 'stores/useTaskStore';
import { JAM_SCREEN } from './screen';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { get } from 'http';
import { STATE } from 'constants/globals/state';
import { EEventState } from 'constants/globals/interface';
import { JAM_EVENT } from './event';

const jam_event = new JAM_EVENT();
const jam_screen = new JAM_SCREEN();

export class JAM_WINDOW {
  /****************************************************/

  public NEW_ID = null;
  public screens: IScreen[] = [];
  public DEFAULT = EWindowState.DEFAULT;
  public MAXIMIZED = EWindowState.MAXIMIZED;
  public MINIMIZED = EWindowState.MINIMIZED;
  public setScreens: (screens: IScreen[]) => void;

  /****************************************************/

  constructor() {
    const { screens, setScreens } = useScreenStore.getState();
    this.screens = screens;
    this.setScreens = setScreens;
  }

  /****************************************************/

  openWindow = async (
    task: ITask,
    id: string | null,
    parentScreenId: string,
    state: EWindowState,
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    returnId?: string
  ) => {
    const windowId = id === null ? uuidv4() : id;

    const parentScreenIndex = await jam_screen.findScreenIndex(
      null,
      parentScreenId
    );

    const z =
      (await this.getHighestWindowZIndex(
        null,
        this.screens[parentScreenIndex]
      )) + 1;

    let { height: titleBarHeight } = measureText(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=',
      windowDefault.titleBar.font.name,
      windowDefault.titleBar.font.size
    );

    titleBarHeight = Math.round(titleBarHeight / 2) * 2;

    if (titleBarHeight < 10) titleBarHeight = 10;

    /* Buttons */
    const buttonSize = Math.round(titleBarHeight / 2) * 2 - 1;

    const buttons = generateBarIcons(
      [
        {
          type: EnumButtonType.CLOSE,
          func: () => {
            this.close(null, windowId);
          },
        },
        {
          type: EnumButtonType.ORDER,
          func: () => {
            this.sortOrder(null, windowId);
          },
        },
        {
          type: EnumButtonType.MAXIMIZE,
          func: () => {
            this.toggleState(task, windowId);
          },
        },
      ],
      buttonSize,
      width - 2
    );

    const titleBar: IWindowTitleBar = {
      x: windowDefault.border.thickness,
      y: windowDefault.border.thickness,
      title: title,
      font: windowDefault.titleBar.font,
      pixels: initPixelArray(
        width - windowDefault.border.thickness * 2,
        titleBarHeight,
        WindowColour.TITLEBAR_BACKGROUND_NOT_SELECTED
      ),
      color: {
        background: WindowColour.TITLEBAR_BACKGROUND_NOT_SELECTED,
        text: WindowColour.TITLEBAR_TEXT,
      },
      buttons: buttons,
    };

    const client: IWindowClient = {
      x: windowDefault.border.thickness,
      y: windowDefault.border.thickness * 2 + titleBarHeight,
      pixels: initPixelArray(
        width - windowDefault.border.thickness * 2,
        height - windowDefault.border.thickness * 3 - titleBarHeight,
        WindowColour.CLIENT
      ),
    };

    const data: IWindow = {
      windowId: windowId,
      parentTaskId: task.id,
      parentScreenId: parentScreenId,
      state: state,
      position: { x, y, z },
      width: width,
      height: height,
      titleBar: titleBar,
      border: {
        thickness: windowDefault.border.thickness,
        color: WindowColour.BORDER,
      },
      pixels: initPixelArray(width, height, WindowColour.BORDER),
      client: client,
    };

    if (!id) {
      this.screens[parentScreenIndex].windows.push(data);
    }

    this.screens[parentScreenIndex].selectedWindowId = windowId;

    const exists = task.res.windows.includes(windowId);
    if (!exists) task.res.windows.push(windowId);

    if (returnId) {
      task.var[returnId] = windowId;
    }

    return data;
  };

  /****************************************************/

  getHighestWindowZIndex = async (task = null, screen: IScreen) => {
    return screen.windows.length
      ? Math.max(...screen.windows.map((w) => w.position.z))
      : 0;
  };

  /****************************************************/

  getLowestWindowZIndex = (task = null, screen: IScreen) => {
    return screen.windows.length
      ? Math.min(...screen.windows.map((w) => w.position.z))
      : 0;
  };

  /****************************************************/

  findWindowIndex = async (task = null, screenid: string, windowId: string) => {
    const { screens } = useScreenStore.getState();
    const screenIndex = await jam_screen.findScreenIndex(null, screenid);
    return screens[screenIndex].windows.findIndex(
      (w) => w.windowId === windowId
    );
  };

  /****************************************************/

  sortWindowsByZIndex = (task = null, windows: IWindow[]) => {
    return windows.sort(
      (a: IWindow, b: IWindow) => a.position.z - b.position.z
    );
  };

  /****************************************************/

  recreate = async (task: ITask, window: IWindow, windowId: string) => {
    const screenId = await this.getWindowParentScreen(null, windowId);
    if (screenId === undefined) return;
    const screenIndex = await jam_screen.findScreenIndex(null, screenId);
    const windowIndex = await this.findWindowIndex(null, screenId, windowId);

    const clone = await this.openWindow(
      task,
      window.windowId,
      window.parentScreenId,
      window.state,
      window.position.x,
      window.position.y,
      window.width,
      window.height,
      window.titleBar!.title
    );
    clone.position.z = window.position.z;

    this.screens[screenIndex].windows[windowIndex] = clone;
  };

  /****************************************************/

  getWindow = async (
    task = null,
    windowId: string
  ): Promise<IWindow | undefined> => {
    let result = undefined;
    this.screens.map((screen) => {
      screen.windows.map((window) => {
        if (window.windowId === windowId) {
          result = window;
        }
      });
    });
    return result;
  };

  /****************************************************/

  toggleState = async (task: ITask, windowId: string) => {
    const window = await this.getWindow(null, windowId);
    if (!window) return;
    const screenIndex = await jam_screen.findScreenIndex(
      null,
      window.parentScreenId
    );
    const screen = this.screens[screenIndex];
    const newState =
      window.state === EWindowState.DEFAULT
        ? EWindowState.MAXIMIZED
        : EWindowState.DEFAULT;
    window.state = newState;
    if (newState === EWindowState.MAXIMIZED) {
      STATE.windowState[windowId] = {
        x: window.position.x,
        y: window.position.y,
        width: window.width,
        height: window.height,
      };
      const { width: screenWidth, height: screenHeight } =
        getPixelArrayDimensions(screen.client.pixels);
      window.position.x = 1;
      window.position.y = 1;
      window.width = screenWidth - 2;
      window.height = screenHeight - 2;
    }
    if (newState === EWindowState.DEFAULT) {
      const { x, y, width, height } = STATE.windowState[windowId];
      window.position.x = x;
      window.position.y = y;
      window.width = width;
      window.height = height;
    }
    this.recreate(task, window, window.windowId);
  };

  /****************************************************/

  close = async (task = null, windowId: string) => {
    const window = await this.getWindow(null, windowId);
    if (!window) return;
    const screenIndex = await jam_screen.findScreenIndex(
      null,
      window.parentScreenId
    );
    const screen = this.screens[screenIndex];
    const windowIndex = await this.findWindowIndex(
      null,
      window.parentScreenId,
      windowId
    );
    screen.windows.splice(windowIndex, 1);
  };

  /****************************************************/

  getWindowParentScreen = async (task = null, windowId: string) => {
    let result = undefined;
    this.screens.map((screen) => {
      screen.windows.map((window) => {
        if (window.windowId === windowId) {
          result = screen.screenId;
        }
      });
    });
    return result;
  };

  /****************************************************/

  bringToFront = async (task = null, windowId: string) => {
    const screenId = await this.getWindowParentScreen(null, windowId);
    if (screenId === undefined) return;
    const screenIndex = await jam_screen.findScreenIndex(null, screenId);
    const windowIndex = await this.findWindowIndex(null, screenId, windowId);
    const resolvedPos = await this.getHighestWindowZIndex(
      null,
      this.screens[screenIndex]
    );
    this.screens[screenIndex].windows[windowIndex].position.z = resolvedPos + 1;
  };

  /****************************************************/

  sendToBack = async (task = null, windowId: string) => {
    const screenId = await this.getWindowParentScreen(null, windowId);
    if (screenId === undefined) return;
    const screenIndex = await jam_screen.findScreenIndex(null, screenId);
    const windowIndex = await this.findWindowIndex(null, screenId, windowId);
    const resolvedPos = await this.getLowestWindowZIndex(
      null,
      this.screens[screenIndex]
    );
    this.screens[screenIndex].windows[windowIndex].position.z = resolvedPos - 1;
  };

  /****************************************************/

  sortOrder = async (task = null, windowId: string) => {
    const screenId = await this.getWindowParentScreen(null, windowId);
    if (screenId === undefined) return;
    const screenIndex = await jam_screen.findScreenIndex(null, screenId);
    const windowIndex = await this.findWindowIndex(null, screenId, windowId);
    const lowestIndex = await this.getLowestWindowZIndex(
      null,
      this.screens[screenIndex]
    );
    if (
      lowestIndex === this.screens[screenIndex].windows[windowIndex].position.z
    ) {
      this.bringToFront(null, windowId);
    } else {
      this.sendToBack(null, windowId);
    }
  };

  /****************************************************/

  setPosition = async (
    screenId: string,
    windowId: string,
    x: number,
    y: number
  ) => {
    const screenIndex = await jam_screen.findScreenIndex(null, screenId);
    const windowIndex = await this.findWindowIndex(null, screenId, windowId);
    const { pixels: screenPixels } = this.screens[screenIndex].client;
    const { width: clientWidth, height: clientHeight } =
      getPixelArrayDimensions(screenPixels);
    const { pixels: windowPixels } =
      this.screens[screenIndex].windows[windowIndex];
    const { width: windowWidth, height: windowHeight } =
      getPixelArrayDimensions(windowPixels);

    /* Position */
    if (x < 1) x = 1;
    if (y < 1) y = 1;

    /* Width */
    const maxX = clientWidth - windowWidth;
    if (x > maxX - 1) {
      x = maxX - 1;
    }

    /* Height */
    const maxY = clientHeight - windowHeight;
    if (y > maxY - 1) {
      y = maxY - 1;
    }
    this.screens[screenIndex].windows[windowIndex].position.x = x;
    this.screens[screenIndex].windows[windowIndex].position.y = y;
    this.setScreens(this.screens);
  };

  /****************************************************/

  getScreenWindowPointers = async (
    task = null,
    screenId: string,
    windowId: string
  ) => {
    const screenIndex = await jam_screen.findScreenIndex(null, screenId);
    const windowIndex = await this.findWindowIndex(null, screenId, windowId);
    return { screenIndex, windowIndex };
  };

  /****************************************************/
}
