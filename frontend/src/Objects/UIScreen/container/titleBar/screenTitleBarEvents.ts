import { screenBringToFront } from 'api/os/screen';
import { EnumMouseButton, IClientMouse, IScreenMouse } from 'functions/mouse';
import { EnumOSEventType, IBaseEvent } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';
import {
  screenContainerDrag,
  screenContainerSetYToTop,
} from '../screenContainerFunc';
import { IScreen } from 'Objects/UIScreen/screenInterface';
import { screenIdToIndex } from 'Objects/UIScreen/screenFunctions';

export const screenTitleBarEvents = (
  event: IBaseEvent,
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
) => {
  const { selectedScreen, setSelectedScreen, screens } =
    useScreenStore.getState();
  const screenIndex = screenIdToIndex(screen.screenId);
  if (screenIndex === undefined) return;

  const mouseDown = () => {
    if (event.button === EnumMouseButton.Left) {
      /* Select selected screen */
      setSelectedScreen({
        id: screen.screenId,
        offset: {
          y: clientMouse.y - screens[screenIndex].position.y,
        },
      });

      /* Set highest z-index */
      screenBringToFront(screen);
    }
  };

  const mouseUp = () => {
    setSelectedScreen(undefined);
  };

  const mouseMove = () => {
    screenContainerDrag(clientMouse);
  };

  const mouseDoubleClick = () => {
    screenContainerSetYToTop(screen);
  };

  switch (event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
    case EnumOSEventType.MouseDoubleClick:
      mouseDoubleClick();
      break;
  }
};
