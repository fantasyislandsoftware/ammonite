import { windowDefault } from 'UIObjects/UIWindow/windowDefault';
import { IWindow } from 'UIObjects/UIWindow/windowInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { findScreenIndex } from './screen';
import { v4 as uuidv4 } from 'uuid';
import { screenContainerRender } from 'UIObjects/UIScreen/container/screenContainerRender';

export const openWindow = (
  parentId: string,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string
) => {
  const { screens, setScreens } = useScreenStore.getState();

  const data: IWindow = {
    id: uuidv4(),
    parentId: parentId,
    position: { x, y },
    width,
    height,
    titleBar: {
      title: title,
      height: 20,
      font: windowDefault.titleBar.font,
      buttons: [],
    },
    borderThickness: windowDefault.borderThickness,
  };
  const screenIndex = findScreenIndex(parentId);
  screens[screenIndex].windows.push(data);
  setScreens(screens);
  screenContainerRender(screens[screenIndex]);
};
