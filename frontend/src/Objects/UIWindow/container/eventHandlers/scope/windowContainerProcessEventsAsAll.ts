import { JAM_SCREEN } from 'api/os/api/jam/screen';
import {
  EnumMouseButton,
  EnumOSEventType,
  IEvent,
} from 'functions/events/IEvents';
import { screenContainerDrag } from 'Objects/UIScreen/container/screenContainerFunc';
import { STATE } from 'constants/globals/state';

const jam_screen = new JAM_SCREEN();

export const windowContainerProcessEventsAsAll = (event: IEvent) => {
  const mouseDownLeft = () => {
    const screenId = event.objects.window?.parentScreenId;
    const windowId = event.objects.window?.windowId;
    if (screenId && windowId) {
      jam_screen.setSelectedWindow(null, { screenId, windowId });
    }
  };

  const mouseDown = () => {
    switch (event.event.button) {
      case EnumMouseButton.Left:
        mouseDownLeft();
        break;
      default:
    }
  };

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
      break;
    case EnumOSEventType.MouseDoubleClick:
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
    default:
      break;
  }
};
