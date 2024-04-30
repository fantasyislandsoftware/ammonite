import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { processScreenTitleBarEvents } from 'Objects/UIScreen/container/titleBar/screenTitleBarEvents';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { ENV } from 'constants/env';
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
  ENV.events.push({ objectType: objectType, event, screen, window });
};

export const processEvents = () => {
  setTimeout(() => {
    const event = ENV.events[ENV.events.length - 1];
    if (event.event === null) return;
    switch (event.objectType) {
      case EnumOSEventObjectType.ScreenTitleBar:
        processScreenTitleBarEvents(event);
        break;
      default:
        break;
    }
  });
};
