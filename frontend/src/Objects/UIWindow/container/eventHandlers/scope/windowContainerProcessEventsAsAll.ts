import { SCREEN_API } from 'api/os/api/screen';
import { WINDOW_API } from 'api/os/api/window';
import { EnumMouseButton } from 'functions/mouse';
import { EnumOSEventType, IEvent } from 'interface/event';

const screen_api = new SCREEN_API();
const window_api = new WINDOW_API();

export const windowContainerProcessEventsAsAll = (event: IEvent) => {
  const mouseDownLeft = () => {
    const screenId = event.objects.window?.parentScreenId;
    const windowId = event.objects.window?.windowId;
    if (screenId && windowId) {
      screen_api.setSelectedWindow(screenId, windowId);
      window_api.bringToFront(windowId);
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
