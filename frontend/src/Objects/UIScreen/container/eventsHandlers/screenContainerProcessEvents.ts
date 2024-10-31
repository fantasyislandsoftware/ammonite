import { EnumOSEventScope, IEvent } from 'interface/event';
import { screenContainerProcessEventsAsParent } from './scope/screenContainerProcessEventsAsChild';
import { screenContainerProcessEventsAsAll } from './scope/screenContainerProcessEventsAsAll';

export const screenContainerProcessEvents = (
  event: IEvent,
  scope: EnumOSEventScope
) => {
  switch (scope) {
    case EnumOSEventScope.All:
      screenContainerProcessEventsAsAll(event);
      break;
    case EnumOSEventScope.Parent:
      screenContainerProcessEventsAsParent(event);
      break;
  }
};
