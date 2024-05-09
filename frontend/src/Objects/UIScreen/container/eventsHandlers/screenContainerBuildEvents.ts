import { IMouse } from 'functions/mouse';
import { EnumOSEventObjectType, IBaseEvent } from 'interface/event';
import { screenClientBuildEvents } from '../client/eventHandlers/screenClientBuildEvents';
import { screenTitleBarBuildEvents } from '../titleBar/eventHandlers/screenTitleBarBuildEvents';
import { IScreen } from '../../_props/screenInterface';
import { addEvent, eventLog } from 'functions/events';

export const screenContainerBuildEvents = (
  event: IBaseEvent,
  screenMouse: IMouse,
  screen: IScreen
) => {
  eventLog(event, EnumOSEventObjectType.Screen);
  addEvent(EnumOSEventObjectType.Screen, event, { screen: screen });

  if (screenMouse.position.y > screen.titleBar!.height) {
    screenClientBuildEvents(event, screen, screenMouse);
  } else {
    screenTitleBarBuildEvents(event, screenMouse, screen);
  }
};
