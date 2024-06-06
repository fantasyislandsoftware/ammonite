import { setButtonDown } from 'Objects/UIButton/props/buttonFunc';
import { screenContainerDrag } from 'Objects/UIScreen/container/screenContainerFunc';
import { SCREEN_API } from 'api/os/api/screen';
import { WINDOW_API } from 'api/os/api/window';
import { STATE } from 'constants/globals/state';
import { EnumMouseButton, EnumOSEventType, IEvent } from 'interface/event';

export const buttonContainerProcessEvents = (event: IEvent) => {
  const screenAPI = new SCREEN_API();
  const windowAPI = new WINDOW_API();

  const mouseDown = () => {
    if (event.objects.button && event.event.button === EnumMouseButton.Left) {
      setButtonDown(event.objects.button.id);
    }
  };

  const mouseUp = () => {
    STATE.dragScreen = undefined;
    STATE.dragWindow = undefined;
    if (event.objects.button?.id === STATE.buttonDownId) {
      eval(event.objects.button?.func);
      STATE.buttonDownId = undefined;
    }
  };

  const mouseMove = () => {
    if (!STATE.dragScreen) return;
    screenContainerDrag();
  };

  switch (event.event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
    default:
      break;
  }
};
