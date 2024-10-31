import { EnumOSEventObjectType, IBaseEvent } from 'functions/events/IEvents';
import { screenClientBuildEvents } from '../client/eventHandlers/screenClientBuildEvents';
import { screenTitleBarBuildEvents } from '../titleBar/eventHandlers/screenTitleBarBuildEvents';
import { IScreen } from '../../_props/screenInterface';
import { eventLog, addEvent } from 'functions/events/events';
import { IMouse } from 'functions/mouse/IMouse';

export const screenContainerBuildEvents = (
  event: IBaseEvent,
  screenMouse: IMouse,
  screen: IScreen
) => {
  eventLog(event, EnumOSEventObjectType.Screen);
  addEvent(EnumOSEventObjectType.Screen, event, screenMouse, {
    screen: screen,
  });

  if (screenMouse.position.y > screen.titleBar!.height) {
    screenClientBuildEvents(event, screen, screenMouse);
  } else {
    screenTitleBarBuildEvents(event, screenMouse, screen);
  }
};
