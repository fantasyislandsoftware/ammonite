import { backdropContainerProcessEvents } from 'Objects/UIBackdrop/container/eventHandlers/backdropContainerProcessEvents';
import { baseContainerProcessEvents } from 'Objects/UIBase/container/eventHandlers/baseContainerProcessEvents';
import { buttonContainerProcessEvents } from 'Objects/UIButton/container/eventHandlers/buttonContainerProcessEvents';
import { IButton } from 'Objects/UIButton/props/buttonInterface';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { screenClientProcessEvents } from 'Objects/UIScreen/container/client/eventHandlers/screenClientProcessEvents';
import { screenContainerProcessEvents } from 'Objects/UIScreen/container/eventsHandlers/screenContainerProcessEvents';
import { screenTitleBarProcessEvents } from 'Objects/UIScreen/container/titleBar/eventHandlers/screenTitleBarProcessEvents';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { windowContainerProcessEvents } from 'Objects/UIWindow/container/eventHandlers/windowContainerProcessEvents';
import { windowTitleBarProcessEvents } from 'Objects/UIWindow/container/titleBar/eventHandlers/windowTitleBarProcessEvents';
import { SCREEN_API } from 'api/os/api/screen';
import { STATE } from 'constants/globals/state';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
  IEvent,
} from 'interface/event';
import { IMouse } from './mouse';
import { windowClientProcessEvents } from 'Objects/UIWindow/container/client/eventHandlers/WindowClientProcessEvents';
import { ENV } from 'constants/globals/env';
import { time } from 'console';
import { EnumScreenChangeMode } from 'constants/globals/interface';
import { WINDOW_API } from 'api/os/api/window';

export const eventLog = (event: IBaseEvent, name: string) => {
  ENV.eventDebug && console.log(`evt_${name} {${event.type}}`);
};

export const addEvent = (
  objectType: EnumOSEventObjectType,
  event: IBaseEvent,
  mouse: IMouse | null,
  objects: {
    screen?: IScreen;
    window?: IWindow;
    button?: IButton;
  }
) => {
  STATE.events.push({
    objectType: objectType,
    event,
    mouse: mouse,
    objects: objects,
  });
};

export const processEvents = () => {
  const window_api = new WINDOW_API();

  if (STATE.events.length === 0) {
    return;
  }

  const parentEvent = STATE.events[1];
  if (parentEvent === undefined) {
    return;
  }

  const event: IEvent | null = STATE.events[STATE.events.length - 1];

  if (event === undefined) {
    return;
  }

  if (event === null) {
    return;
  }

  /* Cycle through all events */
  STATE.events.map((event) => {
    //console.log(event.objectType);
    if (event.objectType === EnumOSEventObjectType.ScreenClient) {
      if (event.mouse) {
        STATE.screenClientMouse.x = event.mouse?.position.x;
        STATE.screenClientMouse.y = event.mouse?.position.y;
      }
      if (
        event.event.type === EnumOSEventType.MouseMove &&
        STATE.dragWindow &&
        event.objects.screen?.screenId === STATE.dragWindow.screenId
      ) {
        window_api.setPosition(
          STATE.dragWindow.screenId,
          STATE.dragWindow.windowId,
          STATE.screenClientMouse.x - STATE.dragWindow.offset.x,
          STATE.screenClientMouse.y - STATE.dragWindow.offset.y
        );
      }
      if (event.event.type === EnumOSEventType.MouseUp) {
        STATE.dragWindow = undefined;
      }
    }
  });
  //console.log('---------');

  /* Process parent event */
  switch (parentEvent.objectType) {
    case EnumOSEventObjectType.Screen:
      screenContainerProcessEvents(parentEvent);
      break;
    default:
      break;
  }

  /* Process child event */
  switch (event.objectType) {
    case EnumOSEventObjectType.Base:
      baseContainerProcessEvents(event);
      break;
    case EnumOSEventObjectType.Backdrop:
      backdropContainerProcessEvents(event);
      break;
    case EnumOSEventObjectType.ScreenTitleBar:
      screenTitleBarProcessEvents(event);
      break;
    case EnumOSEventObjectType.ScreenClient:
      screenClientProcessEvents(event);
      break;
    case EnumOSEventObjectType.Window:
      windowContainerProcessEvents(event);
      break;
    case EnumOSEventObjectType.WindowTitleBar:
      windowTitleBarProcessEvents(event);
      break;
    case EnumOSEventObjectType.WindowClient:
      windowClientProcessEvents(event);
      break;
    case EnumOSEventObjectType.Button:
      buttonContainerProcessEvents(event);
      break;
    default:
      break;
  }
};

export const processScreenChange = () => {
  STATE.screenChangeMode = EnumScreenChangeMode.CHANGING;
};
