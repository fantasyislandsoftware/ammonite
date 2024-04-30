import { backdropContainerProcessEvents } from 'Objects/UIBackdrop/container/eventHandlers/backdropContainerProcessEvents';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { screenClientProcessEvents } from 'Objects/UIScreen/container/client/eventHandlers/screenClientProcessEvents';
import { screenTitleBarProcessEvents } from 'Objects/UIScreen/container/titleBar/eventHandlers/screenTitleBarProcessEvents';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { ENV, STATE } from 'constants/global';
import { EnumOSEventObjectType, IBaseEvent, IEvent } from 'interface/event';

export const eventLog = (event: IBaseEvent, name: string) => {
  ENV.eventDebug && console.log(`evt_${name} {${event.type}}`);
};

export const addEvent = (
  objectType: EnumOSEventObjectType,
  event: IBaseEvent,
  screen?: IScreen,
  window?: IWindow
) => {
  STATE.events.push({ objectType: objectType, event, screen, window });
};

export const processEvents = () => {
  const event = STATE.events[STATE.events.length - 1];
  console.log(event.objectType);
  if (event.event === null) return;
  switch (event.objectType) {
    case EnumOSEventObjectType.Backdrop:
      backdropContainerProcessEvents(event);
      break;
    case EnumOSEventObjectType.ScreenTitleBar:
      screenTitleBarProcessEvents(event);
      break;
    case EnumOSEventObjectType.ScreenClient:
      screenClientProcessEvents(event);
      break;
    default:
      break;
  }
};
