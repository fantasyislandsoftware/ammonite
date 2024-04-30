import { IClientMouse, IScreenMouse } from 'functions/mouse';
import { EnumOSEventObjectType, EnumOSEventType } from 'interface/event';
import { screenContainerDrag } from '../screenContainerFunc';
import { IScreen } from '../../_props/screenInterface';
import { addEvent, eventLog } from 'functions/events';

export const screenClientEvents = (
  event: any,
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
) => {
  eventLog(event, EnumOSEventObjectType.ScreenClient);
  addEvent(EnumOSEventObjectType.ScreenClient, event);

  const mouseMove = () => {
    screenContainerDrag(clientMouse);
  };

  /*switch (event.type) {
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }*/
};
