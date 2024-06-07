import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { SCREEN_API } from 'api/os/api/screen';
import { EnumScreenChangeMode } from 'constants/globals/interface';
import { STATE } from 'constants/globals/state';
import { EnumOSEventScope, EnumOSEventType, IEvent } from 'interface/event';
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
