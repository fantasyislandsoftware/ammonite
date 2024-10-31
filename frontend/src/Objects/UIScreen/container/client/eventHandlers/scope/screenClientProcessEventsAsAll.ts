import { JAM_WINDOW } from 'api/os/api/jam/window';
import { STATE } from 'constants/globals/state';
import { EnumOSEventType, IEvent } from 'functions/events/IEvents';

const jam_window = new JAM_WINDOW();

export const screenClientProcessEventsAsAll = (event: IEvent) => {
  const mouseDown = () => {};

  const mouseUp = () => {};

  const mouseMove = () => {
    if (event.mouse) {
      STATE.screenClientMouse.x = event.mouse?.position.x;
      STATE.screenClientMouse.y = event.mouse?.position.y;
    }
    if (
      STATE.dragWindow &&
      event.objects.screen?.screenId === STATE.dragWindow.screenId
    ) {
      jam_window.setPosition(
        STATE.dragWindow.screenId,
        STATE.dragWindow.windowId,
        STATE.screenClientMouse.x - STATE.dragWindow.offset.x,
        STATE.screenClientMouse.y - STATE.dragWindow.offset.y
      );
    }
  };

  switch (event.event.type) {
    case EnumOSEventType.None:
      break;
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
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
