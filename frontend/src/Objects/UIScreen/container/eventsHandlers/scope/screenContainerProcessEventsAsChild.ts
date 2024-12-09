import { JAM_SCREEN } from 'api/os/api/jam/screen';
import { EnumScreenChangeMode } from 'constants/globals/interface';
import { STATE } from 'constants/globals/state';
import { EnumOSEventType, IEvent } from 'functions/events/IEvents';

const jam_screen = new JAM_SCREEN();

export const screenContainerProcessEventsAsParent = (event: IEvent) => {
  const mouseDown = () => {
    if (!event.objects.screen) return;
    const screenId = event.objects.screen.screenId;
    jam_screen.bringToFront(null, { screenId: screenId });
  };

  const mouseUp = () => {
    setTimeout(() => {
      STATE.screenChangeMode = EnumScreenChangeMode.DONE;
    });
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
