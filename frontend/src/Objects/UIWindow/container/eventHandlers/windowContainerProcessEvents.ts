import { EnumOSEventScope, IEvent } from 'interface/event';
import { windowContainerProcessEventsAsAll } from './scope/windowContainerProcessEventsAsAll';

export const windowContainerProcessEvents = (
  event: IEvent,
  scope: EnumOSEventScope
) => {
  switch (scope) {
    case EnumOSEventScope.Child:
      break;
    case EnumOSEventScope.All:
      windowContainerProcessEventsAsAll(event);
      break;
  }
};
