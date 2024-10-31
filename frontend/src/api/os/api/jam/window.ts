import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { measureText } from 'api/lib/graphics/text';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { WindowColour } from 'Objects/UIWindow/_props/windowColour';
import { windowDefault } from 'Objects/UIWindow/_props/windowDefault';
import {
  IWindow,
  IWindowClient,
  IWindowTitleBar,
} from 'Objects/UIWindow/_props/windowInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { WINDOW_API } from '../window';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from 'stores/useTaskStore';
import { JAM_SCREEN } from './screen';

const jam_screen = new JAM_SCREEN();

export class JAM_WINDOW {
  private self: ITask;
  constructor(self: ITask) {
    this.self = self;
  }
  /* */
  openWindow = async (
    parentTaskId: string,
    parentScreenId: string,
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    returnId: string
  ) => {
    const { screens, setScreens } = useScreenStore.getState();

    const windowAPI = new WINDOW_API();

    const windowId = uuidv4();

    const z =
      windowAPI.getHighestWindowZIndex(
        screens[jam_screen.findScreenIndex(parentScreenId)]
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
          func: `windowAPI.sortOrder('${windowId}')`,
        },
        {
          type: EnumButtonType.MAXIMIZE,
          func: `windowAPI.maximize('${windowId}')`,
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
      parentTaskId: parentTaskId,
      parentScreenId: parentScreenId,
      position: { x, y, z },
      titleBar: titleBar,
      border: {
        thickness: windowDefault.border.thickness,
        color: WindowColour.BORDER,
      },
      pixels: initPixelArray(width, height, WindowColour.BORDER),
      client: client,
    };
    const screenIndex = jam_screen.findScreenIndex(parentScreenId);

    screens[screenIndex].windows.push(data);

    setScreens(screens);
    screenContainerRender(screens[screenIndex]);

    //this.self.var[returnId] = windowId;

    return data;
  };
}
