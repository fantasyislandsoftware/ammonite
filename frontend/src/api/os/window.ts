import { windowDefault } from '../../Objects/UIWindow/windowDefault';
import { IWindow } from '../../Objects/UIWindow/windowInterface';
import { useScreenStore } from '../../stores/useScreenStore';
import { findScreenIndex } from './screen';
import { v4 as uuidv4 } from 'uuid';
import { screenContainerRender } from '../../Objects/UIScreen/container/screenContainerRender';

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

  const data: IWindow = {
    windowId: uuidv4(),
    parentTaskId: parentTaskId,
    parentScreenId: parentScreenId,
    position: { x, y },
    width,
    height,
    titleBar: {
      title: title,
      height: 20,
      font: windowDefault.titleBar.font,
    },
    borderThickness: windowDefault.borderThickness,
  };
  const screenIndex = findScreenIndex(parentScreenId);
  screens[screenIndex].windows.push(data);
  setScreens(screens);
  screenContainerRender(screens[screenIndex]);
};
