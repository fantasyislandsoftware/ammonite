import { backdropContainerProcessEvents } from 'Objects/UIBackdrop/container/eventHandlers/backdropContainerProcessEvents';
import { baseContainerProcessEvents } from 'Objects/UIBase/container/eventHandlers/baseContainerProcessEvents';
import { buttonContainerProcessEvents } from 'Objects/UIButton/container/eventHandlers/buttonContainerProcessEvents';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { screenClientProcessEvents } from 'Objects/UIScreen/container/client/eventHandlers/screenClientProcessEvents';
import { screenContainerProcessEvents } from 'Objects/UIScreen/container/eventsHandlers/screenContainerProcessEvents';
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
  STATE.events.map((event) => {
    switch (event.objectType) {
      case EnumOSEventObjectType.Screen:
        screenContainerProcessEvents(event);
        break;
      case EnumOSEventObjectType.Button:
        buttonContainerProcessEvents(event);
        break;
    }
  });
  /* Top Object */
  const event = STATE.events[STATE.events.length - 1];
  if (event.event === null) return;
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
    default:
      break;
  }
};
