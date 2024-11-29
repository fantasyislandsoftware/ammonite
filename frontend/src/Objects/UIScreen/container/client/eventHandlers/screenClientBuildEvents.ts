import { EnumOSEventObjectType } from 'functions/events/IEvents';
import { IScreen } from '../../../_props/screenInterface';
import { windowContainerBuildEvents } from 'Objects/UIWindow/container/eventHandlers/windowContainerBuildEvents';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { JAM_WINDOW } from 'api/os/api/jam/window';
import { addEvent, eventLog } from 'functions/events/events';
import { IMouse } from 'functions/mouse/IMouse';

const jam_window = new JAM_WINDOW();

export const screenClientBuildEvents = (
  event: any,
  screen: IScreen,
  screenMouse: IMouse
) => {
  eventLog(event, EnumOSEventObjectType.ScreenClient);

  const screenClientMouse = screenMouse;
  screenClientMouse.position.y -= screen.titleBar!.height + 1;

  addEvent(EnumOSEventObjectType.ScreenClient, event, screenClientMouse, {
    screen: screen,
  });

  const windows = jam_window.sortWindowsByZIndex(null, screen.windows);
  windows.map((window: IWindow) => {
    windowContainerBuildEvents(
      event,
      { screen: screen, window: window },
      screenClientMouse
    );
  });
};
