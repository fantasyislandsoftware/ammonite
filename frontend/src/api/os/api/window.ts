import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import {
  IWindow,
  IWindowClient,
  IWindowTitleBar,
} from 'Objects/UIWindow/_props/windowInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { SCREEN_API } from './screen';
import { measureText } from 'api/lib/graphics/text';
import { windowDefault } from 'Objects/UIWindow/_props/windowDefault';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { WindowColour } from 'Objects/UIWindow/_props/windowColour';
import { v4 as uuidv4 } from 'uuid';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { STATE } from 'constants/globals/state';

export class WINDOW_API {
  openWindow = (
    parentTaskId: string,
    parentScreenId: string,
    x: number,
    y: number,
    width: number,
    height: number,
    title: string
  ) => {
    const { screens, setScreens } = useScreenStore.getState();

    const screenAPI = new SCREEN_API();
    const windowAPI = new WINDOW_API();

    const z =
      windowAPI.getHighestWindowZIndex(
        screens[screenAPI.findScreenIndex(parentScreenId)]
      ) + 1;

    let { height: titleBarHeight } = measureText(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=',
      windowDefault.titleBar.font.name,
      windowDefault.titleBar.font.size
    );
    titleBarHeight--;

    /* Buttons */
    const buttonSize = Math.round(titleBarHeight / 2) * 2 - 1;
    const buttons = generateBarIcons(
      [
        {
          type: EnumButtonType.ORDER,
          func: `windowAPI.sendToBack('${uuidv4()}')`,
        },
        {
          type: EnumButtonType.MAXIMIZE,
          func: `windowAPI.maximize('${uuidv4()}')`,
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

    const windowId = uuidv4();

    const data: IWindow = {
      windowId: windowId,
      parentTaskId: parentTaskId,
      parentScreenId: parentScreenId,
      position: { x, y, z },
      width,
      height,
      titleBar: titleBar,
      border: {
        thickness: windowDefault.border.thickness,
        color: WindowColour.BORDER,
      },
      pixels: initPixelArray(width, height, WindowColour.BORDER),
      client: client,
    };
    const screenIndex = screenAPI.findScreenIndex(parentScreenId);
    screens[screenIndex].windows.push(data);
    setScreens(screens);
    screenContainerRender(screens[screenIndex]);
  };

  /****************************************************/

  getHighestWindowZIndex = (screen: IScreen) => {
    return screen.windows.length
      ? Math.max(...screen.windows.map((w) => w.position.z))
      : 0;
  };

  /****************************************************/

  findWindowIndex = (screenid: string, windowId: string) => {
    const { screens } = useScreenStore.getState();
    const screenAPI = new SCREEN_API();
    const screenIndex = screenAPI.findScreenIndex(screenid);
    return screens[screenIndex].windows.findIndex(
      (w) => w.windowId === windowId
    );
  };

  /****************************************************/

  sortWindowsByZIndex = (windows: IWindow[]) => {
    return windows.sort(
      (a: IWindow, b: IWindow) => a.position.z - b.position.z
    );
  };

  /****************************************************/

  maximize = (windowId: string) => {
    console.log('maximizeWindow');
  };

  /****************************************************/

  sendToBack = (windowId: string) => {
    console.log('sendToBack');
  };

  /****************************************************/

  setPosition = (screenId: string, windowId: string, x: number, y: number) => {
    const { screens, setScreens } = useScreenStore.getState();
    const screenAPI = new SCREEN_API();
    const windowAPI = new WINDOW_API();
    const screenIndex = screenAPI.findScreenIndex(screenId);
    const windowIndex = windowAPI.findWindowIndex(screenId, windowId);
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (
      x >
      screens[screenIndex].width -
        screens[screenIndex].windows[windowIndex].width
    ) {
      x =
        screens[screenIndex].width -
        screens[screenIndex].windows[windowIndex].width;
    }
    if (
      y >
      screens[screenIndex].height -
        screens[screenIndex].windows[windowIndex].height
    ) {
      y =
        screens[screenIndex].height -
        screens[screenIndex].windows[windowIndex].height;
    }
    screens[screenIndex].windows[windowIndex].position.x = x;
    screens[screenIndex].windows[windowIndex].position.y = y;
    setScreens(screens);
  };
}
