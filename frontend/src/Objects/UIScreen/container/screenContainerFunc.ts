import { IClientMouse } from 'functions/mouse';
import { useScreenStore } from 'stores/useScreenStore';
import { IScreen } from '../_props/screenInterface';
import { getHighestScreenZIndex, setScreen } from '../_props/screenFunctions';
import { STATE } from 'constants/global';
import { SCREEN_API } from 'api/os/api/screen';

export const screenContainerDrag = () => {
  const { screens } = useScreenStore.getState();
  const screenAPI = new SCREEN_API();
  if (STATE.dragScreen === undefined) return;
  const screenIndex = screenAPI.findScreenIndex(STATE.dragScreen.id);
  const selected = screens[screenIndex];
  let newPos = STATE.clientMouse.y - STATE.dragScreen.offset.y;
  if (newPos < 0) newPos = 0;
  selected.position = { y: newPos, z: 0 };
  setScreen(selected);
};

/*export const screenContainerSendToBack = (screen: IScreen) => {
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
};*/
