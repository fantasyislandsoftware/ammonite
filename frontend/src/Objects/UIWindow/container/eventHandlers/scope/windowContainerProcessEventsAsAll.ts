import { SCREEN_API } from 'api/os/api/screen';
import { EnumOSEventType, IEvent } from 'interface/event';
const screen_api = new SCREEN_API();

export const windowContainerProcessEventsAsAll = (event: IEvent) => {
  switch (event.event.type) {
    case EnumOSEventType.None:
      break;
    case EnumOSEventType.MouseDown:
      const screenId = event.objects.window?.parentScreenId;
      const windowId = event.objects.window?.windowId;
      if (screenId && windowId) {
        screen_api.setSelectedWindow(screenId, undefined);
        screen_api.setSelectedWindow(screenId, windowId);
      }
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
