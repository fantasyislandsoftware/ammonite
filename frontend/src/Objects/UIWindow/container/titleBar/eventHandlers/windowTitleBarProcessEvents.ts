import { JAM_WINDOW } from 'api/os/api/jam/window';
import { STATE } from 'constants/globals/state';
import {
  EnumMouseButton,
  EnumOSEventType,
  IEvent,
} from 'functions/events/IEvents';

const jam_window = new JAM_WINDOW();

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

  const mouseMove = () => {};

  const mouseDbClick = (event: IEvent) => {
    if (event.mouse?.button === EnumMouseButton.Left) {
      jam_window.toggleState(event.objects.window?.windowId || '');
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
