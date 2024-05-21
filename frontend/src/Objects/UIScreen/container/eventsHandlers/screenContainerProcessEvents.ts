import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { SCREEN_API } from 'api/os/api/screen';
import { STATE } from 'constants/global';
import { EnumOSEventType, IEvent } from 'interface/event';

export const screenContainerProcessEvents = (event: IEvent) => {
  const screenAPI = new SCREEN_API();

  const mouseDown = () => {
    if (!event.objects.screen) return;
    const screenId = event.objects.screen.screenId;
    screenAPI.bringToFront(screenId);
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
