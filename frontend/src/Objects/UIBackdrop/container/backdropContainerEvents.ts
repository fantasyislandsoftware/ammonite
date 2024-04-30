import { screenContainerDrag } from '../../UIScreen/container/screenContainerFunc';
import { IClientMouse } from '../../../functions/mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
} from '../../../interface/event';
import { useScreenStore } from '../../../stores/useScreenStore';
import { addEvent, eventLog } from 'functions/events';

export const backdropContainerEvents = (
  event: IBaseEvent,
  clientMouse: IClientMouse
) => {
  eventLog(event, EnumOSEventObjectType.Backdrop);
  addEvent(EnumOSEventObjectType.Backdrop, event);

  const { selectedScreen, screens } = useScreenStore.getState();

  const mouseMove = () => {
    screenContainerDrag(clientMouse);
  };

  /*switch (event.type) {
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }*/
};
