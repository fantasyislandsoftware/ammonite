import { windowContainerDrag } from 'Objects/UIWindow/windowContainerFunc';
import { WINDOW_API } from 'api/os/api/window';
import { STATE } from 'constants/globals/state';
import {
  EnumMouseButton,
  EnumOSEventObjectType,
  EnumOSEventType,
  IEvent,
} from 'interface/event';

const window_api = new WINDOW_API();

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

  const mouseUp = () => {};

  const mouseMove = () => {
    event.mouse && windowContainerDrag(event.mouse);
  };

  const mouseDbClick = (event: IEvent) => {
    if (event.mouse?.button === EnumMouseButton.Left) {
      window_api.maximize(event.objects.window?.windowId || '');
    }
  };

  switch (event.event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown(event);
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseDoubleClick:
      mouseDbClick(event);
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }
};
