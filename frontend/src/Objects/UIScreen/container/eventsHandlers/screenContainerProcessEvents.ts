import { SCREEN_API } from 'api/os/api/screen';
import { EnumOSEventType, IEvent } from 'interface/event';

export const screenContainerProcessEvents = (event: IEvent) => {
  const screenAPI = new SCREEN_API();

  const mouseDown = () => {
    setTimeout(() => {
      if (!event.objects.screen) return;
      screenAPI.bringToFront(event.objects.screen.screenId);
    });
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
