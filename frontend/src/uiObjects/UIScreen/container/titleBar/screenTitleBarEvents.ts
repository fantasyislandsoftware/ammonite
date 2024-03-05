import { screenBringToFront } from 'src/api/os/screen';
import {
  EnumMouseButton,
  IClientMouse,
  IScreenMouse,
} from 'src/functions/mouse';
import { screenIdToIndex } from 'src/functions/screen';
import { EnumOSEventType, IBaseEvent } from 'src/interface/event';
import { useScreenStore } from 'src/stores/useScreenStore';
import {
  screenContainerDrag,
  screenContainerSetYToTop,
} from '../screenContainerFunc';
import { IScreen } from 'src/UIObjects/UIScreen/screenInterface';

export const screenTitleBarEvents = (
  event: IBaseEvent,
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
) => {
  const { selectedScreen, setSelectedScreen, screens } =
    useScreenStore.getState();
  const screenIndex = screenIdToIndex(screen.id);
  if (screenIndex === undefined) return;

  const mouseDown = () => {
    if (event.button === EnumMouseButton.Left) {
      /* Select selected screen */
      setSelectedScreen({
        id: screen.id,
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
