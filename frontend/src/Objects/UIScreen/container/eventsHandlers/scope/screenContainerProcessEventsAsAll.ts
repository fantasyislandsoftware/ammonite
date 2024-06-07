import { SCREEN_API } from 'api/os/api/screen';
import { EnumOSEventType, IEvent } from 'interface/event';
const screenAPI = new SCREEN_API();

export const screenContainerProcessEventsAsAll = (event: IEvent) => {
  const mouseDown = () => {
    const screenId = event.objects.screen?.screenId;
    if (screenId) {
      screenAPI.setSelectedWindow(screenId, undefined);
    }
  };

  const mouseUp = () => {};

  switch (event.event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    default:
      break;
  }
};
