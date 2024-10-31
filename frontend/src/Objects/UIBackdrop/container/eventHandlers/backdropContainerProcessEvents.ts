import { screenContainerDrag } from 'Objects/UIScreen/container/screenContainerFunc';
import { STATE } from 'constants/globals/state';
import { EnumOSEventType, IEvent } from 'functions/events/IEvents';

export const backdropContainerProcessEvents = (event: IEvent) => {
  const mouseUp = () => {};

  const mouseMove = () => {
    screenContainerDrag();
  };

  switch (event.event.type) {
    case EnumOSEventType.None:
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
