import { useScreenStore } from 'stores/useScreenStore';
import {
  getHighestScreenZIndex,
  setScreen,
} from 'Objects/UIScreen/_props/screenFunctions';
import { IScreen, IScreenMode } from 'Objects/UIScreen/_props/screenInterface';
import { measureText } from 'api/lib/graphics/text';
import { screenDefault } from 'Objects/UIScreen/_props/screenDefault';
import { v4 as uuidv4 } from 'uuid';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { ScreenColour } from 'Objects/UIScreen/_props/screenColour';
import { generateDefaultColorPalette } from 'Objects/UIScreen/_props/palettes';
import { STATE } from 'constants/globals/state';
import { processScreenChange } from 'functions/events';
import { low } from 'Objects/UIScreen/_props/screenModes';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';

export class SCREEN_API {
  public low: IScreenMode = low;
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
    const screenIndex = this.findScreenIndex(screenId);
    this.screens[screenIndex].position.y = 0;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/

  bringToFront = (screenId: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    let pos = 100;
    if (this.isTopScreen(screenId)) return;
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

  sendToBack = (screenId: string) => {
    const screenIndex = this.findScreenIndex(screenId);
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

  isTopScreen = (screenId: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    return this.screens[screenIndex].zIndex === getHighestScreenZIndex();
  };

  /****************************************************/

  reorderScreen = (screenId: string) => {
    if (STATE.screenChangeMode === 'changing') return;
    const screenIndex = this.findScreenIndex(screenId);
    if (this.screens[screenIndex].zIndex === getHighestScreenZIndex()) {
      this.sendToBack(screenId);
    }
  };

  /****************************************************/

  findScreenIndex = (id: string) => {
    const { screens } = useScreenStore.getState();
    return screens.findIndex((s) => s.screenId === id);
  };

  /****************************************************/

  setTitle = (screenId: string, title: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    this.screens[screenIndex].titleBar!.title = title;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/

  setSelectedWindow = (screenId: string, windowId: string | undefined) => {
    const screenIndex = this.findScreenIndex(screenId);
    this.screens[screenIndex].selectedWindowId = windowId;
    setScreen(this.screens[screenIndex]);
  };

  /****************************************************/
}
