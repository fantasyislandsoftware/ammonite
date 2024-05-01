import { screenContainerDrag } from 'Objects/UIScreen/container/screenContainerFunc';
import { EnumOSEventType, IEvent } from 'interface/event';

export const backdropContainerProcessEvents = (event: IEvent) => {
  const mouseMove = () => {
    screenContainerDrag();
  };

  switch (event.event.type) {
    case 'None':
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
    default:
      break;
  }
};
