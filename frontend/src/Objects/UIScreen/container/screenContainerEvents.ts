import { EnumMouseButton, IClientMouse, IScreenMouse } from 'functions/mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
} from 'interface/event';
import { screenClientBuildEvents } from './client/eventHandlers/screenClientBuildEvents';
import { screenTitleBarBuildEvents } from './titleBar/eventHandlers/screenTitleBarBuildEvents';
import { IScreen } from '../_props/screenInterface';
import { screenContainerBringToFront } from './screenContainerFunc';
import { addEvent, eventLog } from 'functions/events';

export const screenContainerEvents = (
  event: IBaseEvent,
  screenMouse: IScreenMouse,
  screen: IScreen
) => {
  eventLog(event, EnumOSEventObjectType.Screen);
  addEvent(EnumOSEventObjectType.Screen, event);

  if (screenMouse.screen.y > screen.titleBar!.height) {
    screenClientBuildEvents(event, screen);
  } else {
    screenTitleBarBuildEvents(event, screenMouse, screen);
  }
};
