import { STATE } from 'constants/globals/state';
import { EnumOSEventScope, EnumOSEventType, IEvent } from 'interface/event';
import { screenContainerDrag } from '../../screenContainerFunc';
import { screenClientProcessEventsAsChild } from './scope/screenClientProcessEventsAsChild';
import { screenClientProcessEventsAsAll } from './scope/screenClientProcessEventsAsAll';

export const screenClientProcessEvents = (
  event: IEvent,
  scope: EnumOSEventScope
) => {
  switch (scope) {
    case EnumOSEventScope.Child:
      screenClientProcessEventsAsChild(event);
      break;
    case EnumOSEventScope.All:
      screenClientProcessEventsAsAll(event);
      break;
  }
};
