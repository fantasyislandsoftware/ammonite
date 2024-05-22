import { STATE } from 'constants/globals/state';
import { EnumOSEventType, IEvent } from 'interface/event';

export const baseContainerProcessEvents = (event: IEvent) => {
  const mouseLeave = () => {
    STATE.dragScreen = undefined;
  };

  switch (event.event.type) {
    case EnumOSEventType.MouseLeave:
      mouseLeave();
      break;
    default:
  }
};
