import { IClientMouse } from 'functions/mouse';
import { useScreenStore } from 'stores/useScreenStore';
import { IScreen } from '../screenInterface';
import { findScreenIndex } from 'api/os/screen';
import { getHighestScreenZIndex, setScreen } from '../screenFunctions';

export const screenContainerDrag = (clientMouse: IClientMouse) => {
  const { selectedScreen, screens } = useScreenStore.getState();
  if (!selectedScreen) return;
  const screenIndex = findScreenIndex(selectedScreen.id);
  const selected = screens[screenIndex];
  let newPos = clientMouse.y - selectedScreen.offset.y;
  if (newPos < 0) newPos = 0;
  selected.position = { y: newPos, z: 0 };
  setScreen(selected);
};

export const screenContainerSetYToTop = (screen: IScreen) => {
  screen.position.y = 0;
  setScreen(screen);
};

export const screenContainerBringToFront = (screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  const screenIndex = screens.findIndex((s) => s.screenId === screen.screenId);
  let pos = 100;
  screens.map((_screen) => {
    if (_screen.screenId !== screen?.screenId) {
      _screen.zIndex = pos;
      pos++;
    }
  });
  screens[screenIndex].zIndex = pos;
  setScreens(screens);
};

export const screenContainerSendToBack = (screen: IScreen) => {
  const { screens, setScreens } = useScreenStore.getState();
  const screenIndex = screens.findIndex((s) => s.screenId === screen.screenId);
  let pos = getHighestScreenZIndex();
  screens.map((_screen) => {
    if (_screen.screenId !== screen?.screenId) {
      _screen.zIndex = pos;
      pos--;
    }
  });
  screens[screenIndex].zIndex = pos;
  setScreens(screens);
};
