import { IClientMouse, IScreenMouse } from 'functions/mouse';
import { EnumOSEventObjectType, EnumOSEventType } from 'interface/event';
import { screenContainerDrag } from '../../screenContainerFunc';
import { IScreen } from '../../../_props/screenInterface';
import { addEvent, eventLog } from 'functions/events';

export const screenClientBuildEvents = (event: any, screen: IScreen) => {
  eventLog(event, EnumOSEventObjectType.ScreenClient);
  addEvent(EnumOSEventObjectType.ScreenClient, event, { screen: screen });
};
