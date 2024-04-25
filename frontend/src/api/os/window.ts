import { windowDefault } from '../../Objects/UIWindow/windowDefault';
import { IWindow } from '../../Objects/UIWindow/windowInterface';
import { useScreenStore } from '../../stores/useScreenStore';
import { findScreenIndex } from './screen';
import { v4 as uuidv4 } from 'uuid';
import { screenContainerRender } from '../../Objects/UIScreen/container/screenContainerRender';
import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { WindowColour } from 'Objects/UIWindow/windowColour';
import { measureText } from 'api/lib/graphics/text';

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
    },
    borderThickness: windowDefault.borderThickness,
    pixels: initPixelArray(width, height, WindowColour.CLIENT),
  };
  const screenIndex = findScreenIndex(parentScreenId);
  screens[screenIndex].windows.push(data);
  setScreens(screens);
  screenContainerRender(screens[screenIndex]);
};
