import { windowDefault } from '../../Objects/UIWindow/_props/windowDefault';
import { IWindow } from '../../Objects/UIWindow/_props/windowInterface';
import { useScreenStore } from '../../stores/useScreenStore';
import { findScreenIndex } from './screen';
import { v4 as uuidv4 } from 'uuid';
import { screenContainerRender } from '../../Objects/UIScreen/container/screenContainerRender';
import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { WindowColour } from 'Objects/UIWindow/_props/windowColour';
import { measureText } from 'api/lib/graphics/text';
import { makeButtons } from 'Objects/UIButton/buttonFunc';
import { EnumButtonFunc } from 'Objects/UIButton/buttonInterface';

export const openWindow = (
  parentTaskId: string,
  parentScreenId: string,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string
) => {
  const { screens, setScreens } = useScreenStore.getState();

  const { height: titleBarHeight } = measureText(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=',
    windowDefault.titleBar.font.name,
    windowDefault.titleBar.font.size
  );

  const buttonSize = Math.round(titleBarHeight / 2) * 2;

  const data: IWindow = {
    windowId: uuidv4(),
    parentTaskId: parentTaskId,
    parentScreenId: parentScreenId,
    position: { x, y },
    width,
    height,
    titleBar: {
      title: title,
      offset: windowDefault.borderThickness,
      height: titleBarHeight,
      font: windowDefault.titleBar.font,
      pixels: initPixelArray(
        width - windowDefault.borderThickness * 2,
        titleBarHeight,
        WindowColour.TITLEBAR_BACKGROUND
      ),
      color: {
        background: WindowColour.TITLEBAR_BACKGROUND,
        text: WindowColour.TITLEBAR_TEXT,
      },
      buttons: makeButtons(width, buttonSize, [
        EnumButtonFunc.MAXIMIZE,
        EnumButtonFunc.ORDER,
      ]),
    },
    border: {
      thickness: windowDefault.borderThickness,
      color: WindowColour.BORDER,
    },
    pixels: initPixelArray(width, height, WindowColour.CLIENT),
  };
  const screenIndex = findScreenIndex(parentScreenId);
  screens[screenIndex].windows.push(data);
  setScreens(screens);
  screenContainerRender(screens[screenIndex]);
};
