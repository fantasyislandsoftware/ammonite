import { EnumOSEventObjectType, IBaseEvent } from '../../../../interface/event';
import { addEvent, eventLog } from 'functions/events';

export const backdropContainerBuildEvents = (event: IBaseEvent) => {
  eventLog(event, EnumOSEventObjectType.Backdrop);
  addEvent(EnumOSEventObjectType.Backdrop, event);
};
