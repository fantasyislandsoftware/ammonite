import { screenContainerDrag } from '../../../UIScreen/container/screenContainerFunc';
import { IClientMouse } from '../../../../functions/mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
} from '../../../../interface/event';
import { useScreenStore } from '../../../../stores/useScreenStore';
import { addEvent, eventLog } from 'functions/events';

export const backdropContainerBuildEvents = (event: IBaseEvent) => {
  eventLog(event, EnumOSEventObjectType.Backdrop);
  addEvent(EnumOSEventObjectType.Backdrop, event);
};
