import { JAM_SCREEN } from 'api/os/api/jam/screen';
import { EnumOSEventType, IEvent } from 'interface/event';

const jam_screen = new JAM_SCREEN();

export const screenContainerProcessEventsAsAll = (event: IEvent) => {
  const mouseDown = () => {
    const screenId = event.objects.screen?.screenId;
    if (screenId) {
      jam_screen.setSelectedWindow(screenId, undefined);
    }
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
