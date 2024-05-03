import { useScreenStore } from 'stores/useScreenStore';
import { findScreenIndex } from '../screen';
import {
  getHighestScreenZIndex,
  setScreen,
} from 'Objects/UIScreen/_props/screenFunctions';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';

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

  maximizeScreen = (screenId: string) => {
    const screenIndex = findScreenIndex(screenId);
    this.screens[screenIndex].position.y = 0;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/

  bringToFront = (screenId: string) => {
    const screenIndex = findScreenIndex(screenId);
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
    const screenIndex = findScreenIndex(screenId);
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
    const screenIndex = findScreenIndex(screenId);
    return this.screens[screenIndex].zIndex === getHighestScreenZIndex();
  };

  /****************************************************/

  reorderScreen = (screenId: string) => {
    const screenIndex = findScreenIndex(screenId);
    if (this.screens[screenIndex].zIndex === getHighestScreenZIndex()) {
      this.sendToBack(screenId);
    }
  };
}
