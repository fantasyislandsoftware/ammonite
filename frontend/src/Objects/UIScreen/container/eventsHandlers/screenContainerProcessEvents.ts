import { EnumOSEventType, IEvent } from 'interface/event';
import { screenContainerBringToFront } from '../screenContainerFunc';

export const screenContainerProcessEvents = (event: IEvent) => {
  const mouseDown = () => {
    if (event.screen === undefined) return;
    screenContainerBringToFront(event.screen);
  };

  switch (event.event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    default:
      break;
  }
};
