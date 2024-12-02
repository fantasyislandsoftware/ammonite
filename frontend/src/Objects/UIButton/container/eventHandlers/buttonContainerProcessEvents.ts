import { setButtonDown } from 'Objects/UIButton/props/buttonFunc';
import { screenContainerDrag } from 'Objects/UIScreen/container/screenContainerFunc';
import { JAM_SCREEN } from 'api/os/api/jam/screen';
import { JAM_WINDOW } from 'api/os/api/jam/window';
import { STATE } from 'constants/globals/state';
import {
  EnumMouseButton,
  EnumOSEventType,
  IEvent,
} from 'functions/events/IEvents';

const jam_screen = new JAM_SCREEN();
const jam_window = new JAM_WINDOW();

export const buttonContainerProcessEvents = (event: IEvent) => {
  const mouseDown = () => {
    if (event.objects.button && event.event.button === EnumMouseButton.Left) {
      setButtonDown(event.objects.button.id);
    }
  };

  const mouseUp = () => {
    if (event.objects.button?.id === STATE.buttonDownId) {
      //eval(event.objects.button?.func);
      event.objects.button?.func();
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
