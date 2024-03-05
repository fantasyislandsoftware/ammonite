import { IClientMouse, IScreenMouse } from 'functions/mouse';
import { IOSEvent } from 'interface/event';
import { screenClientEvents } from './client/screenClientEvents';
import { screenTitleBarEvents } from './titleBar/screenTitleBarEvents';
import { IScreen } from '../screenInterface';

export const screenContainerEvents = (
  event: IOSEvent,
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
) => {
  if (screenMouse.screen.y > screen.titleBar!.height) {
    screenClientEvents(event, screenMouse, clientMouse, screen);
  } else {
    screenTitleBarEvents(event, screenMouse, clientMouse, screen);
  }
};
