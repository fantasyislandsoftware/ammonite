import { windowContainerDrag } from 'Objects/UIWindow/windowContainerFunc';
import { STATE } from 'constants/globals/state';
import {
  EnumMouseButton,
  EnumOSEventObjectType,
  EnumOSEventType,
  IEvent,
} from 'interface/event';

export const windowTitleBarProcessEvents = (event: IEvent) => {
  const mouseDown = (event: IEvent) => {
    switch (event.event.button) {
      case EnumMouseButton.Left:
        if (!event.objects.window) return;
        STATE.dragWindow = {
          screenId: event.objects.screen?.screenId || '',
          windowId: event.objects.window.windowId,
          offset: {
            x: STATE.screenClientMouse.x - event.objects.window.position.x,
            y: STATE.screenClientMouse.y - event.objects.window.position.y,
          },
        };
        break;
      default:
    }
  };

  const mouseUp = () => {
    STATE.dragWindow = undefined;
  };

  const mouseMove = () => {
    event.mouse && windowContainerDrag(event.mouse);
  };

  switch (event.event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown(event);
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }
};
