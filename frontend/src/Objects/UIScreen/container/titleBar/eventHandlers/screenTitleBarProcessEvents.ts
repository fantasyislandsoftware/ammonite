import { screenIdToIndex } from 'Objects/UIScreen/_props/screenFunctions';
import { STATE } from 'constants/globals/state';
import {
  IEvent,
  EnumOSEventType,
  EnumMouseButton,
} from 'functions/events/IEvents';
import { useScreenStore } from 'stores/useScreenStore';
import { screenContainerDrag } from '../../screenContainerFunc';
import { JAM_SCREEN } from 'api/os/api/jam/screen';

const jam_screen = new JAM_SCREEN();

export const screenTitleBarProcessEvents = (event: IEvent) => {
  const { screens } = useScreenStore.getState();

  const mouseDown = () => {
    switch (event.event.button) {
      case EnumMouseButton.Left:
        if (!event.objects.screen) return;
        const screenIndex = screenIdToIndex(event.objects.screen.screenId);
        if (screenIndex === undefined) return;
        STATE.dragScreen = {
          id: event.objects.screen.screenId,
          offset: {
            x: 0,
            y: STATE.clientMouse.y - screens[screenIndex].position.y,
          },
        };
        STATE.prevDragScreen = event.objects.screen.screenId;
        break;
      default:
    }
  };

  const mouseDoubleClick = () => {
    if (event.event.button === EnumMouseButton.Left) {
      if (!event.objects.screen) return;
      jam_screen.maximizeScreen(event.objects.screen.screenId);
    }
  };

  const mouseUp = () => {};

  const mouseMove = () => {
    if (!STATE.dragScreen) return;
    screenContainerDrag();
  };

  switch (event.event.type) {
    case EnumOSEventType.None:
      break;
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseDoubleClick:
      mouseDoubleClick();
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
    default:
      break;
  }
};
