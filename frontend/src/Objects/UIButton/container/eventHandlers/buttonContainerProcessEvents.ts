import { setButtonDown } from 'Objects/UIButton/props/buttonFunc';
import { SCREEN } from 'api/os/commands/screen';
import { STATE } from 'constants/global';
import { EnumOSEventType, IEvent } from 'interface/event';

export const buttonContainerProcessEvents = (event: IEvent) => {
  /* Command */
  const screen = new SCREEN();

  const mouseDown = () => {
    if (event.objects.button) {
      setButtonDown(event.objects.button.id);
    }
  };

  const mouseUp = () => {
    if (event.objects.button?.id === STATE.buttonDownId) {
      eval(event.objects.button?.func);
      STATE.buttonDownId = undefined;
    }
  };

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
