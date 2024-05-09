import { IClientMouse, IMouse } from 'functions/mouse';
import { EnumOSEventObjectType, EnumOSEventType } from 'interface/event';
import { screenContainerDrag } from '../../screenContainerFunc';
import { IScreen } from '../../../_props/screenInterface';
import { addEvent, eventLog } from 'functions/events';
import { windowContainerBuildEvents } from 'Objects/UIWindow/container/eventHandlers/windowContainerBuildEvents';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { WINDOW_API } from 'api/os/api/window';

export const screenClientBuildEvents = (
  event: any,
  screen: IScreen,
  screenMouse: IMouse
) => {
  const windowAPI = new WINDOW_API();
  eventLog(event, EnumOSEventObjectType.ScreenClient);
  addEvent(EnumOSEventObjectType.ScreenClient, event, { screen: screen });

  const screenClientMouse = screenMouse;
  screenClientMouse.position.y -= screen.titleBar!.height + 1;

  const windows = windowAPI.sortWindowsByZIndex(screen.windows);
  windows.map((window: IWindow) => {
    console.log(window.titleBar!.title);
  });
  console.log('-------');

  //screen.windows.map((window) => {
  //  windowContainerBuildEvents(event, window, screenClientMouse);
  //});
};
