import { screenContainerDrag } from 'Objects/UIScreen/container/screenContainerFunc';
import { STATE } from 'constants/globals/state';
import { EnumOSEventType, IEvent } from 'functions/events/IEvents';

export const screenClientProcessEventsAsChild = (event: IEvent) => {
  const mouseDown = () => {};

  const mouseUp = () => {};

  const mouseMove = () => {
    if (!STATE.dragScreen) return;
    screenContainerDrag();
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
