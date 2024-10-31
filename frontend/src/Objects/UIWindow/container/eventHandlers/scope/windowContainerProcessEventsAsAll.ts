import { JAM_SCREEN } from 'api/os/api/jam/screen';
import {
  EnumMouseButton,
  EnumOSEventType,
  IEvent,
} from 'functions/events/IEvents';

const jam_screen = new JAM_SCREEN();

export const windowContainerProcessEventsAsAll = (event: IEvent) => {
  const mouseDownLeft = () => {
    const screenId = event.objects.window?.parentScreenId;
    const windowId = event.objects.window?.windowId;
    if (screenId && windowId) {
      jam_screen.setSelectedWindow(screenId, windowId);
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
      break;
    default:
      break;
  }
};
