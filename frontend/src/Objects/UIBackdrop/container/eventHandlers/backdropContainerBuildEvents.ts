import { eventLog, addEvent } from 'functions/events/events';
import {
  EnumOSEventObjectType,
  IBaseEvent,
} from '../../../../functions/events/IEvents';

export const backdropContainerBuildEvents = (event: IBaseEvent) => {
  eventLog(event, EnumOSEventObjectType.Backdrop);
  addEvent(EnumOSEventObjectType.Backdrop, event, null, {});
};
