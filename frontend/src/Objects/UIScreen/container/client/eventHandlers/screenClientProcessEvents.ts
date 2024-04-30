import { STATE } from 'constants/global';
import { EnumOSEventType, IEvent } from 'interface/event';
import { screenContainerDrag } from '../../screenContainerFunc';

export const screenClientProcessEvents = (event: IEvent) => {
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
