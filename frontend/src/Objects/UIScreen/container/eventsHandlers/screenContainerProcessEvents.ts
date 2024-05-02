import { SCREEN } from 'api/os/commands/screen';
import { EnumOSEventType, IEvent } from 'interface/event';
//import { screenContainerBringToFront } from '../screenContainerFunc';

export const screenContainerProcessEvents = (event: IEvent) => {
  const screen = new SCREEN();

  const mouseDown = () => {
    if (event.objects.screen === undefined) return;
    screen.bringToFront(event.objects.screen.screenId);
    //screenContainerBringToFront(event.objects.screen);
  };

  switch (event.event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    default:
      break;
  }
};
