import { EnumMouseButton, IClientMouse, IScreenMouse } from 'functions/mouse';
import { EnumOSEventType, IBaseEvent } from 'interface/event';
import { screenClientEvents } from './client/screenClientEvents';
import { screenTitleBarEvents } from './titleBar/screenTitleBarEvents';
import { IScreen } from '../screenInterface';
import { resetAllButtons } from 'Objects/UIButton/buttonContainerFunc';
import { useScreenStore } from 'stores/useScreenStore';
import { screenIdToIndex } from '../screenFunctions';
import { screenContainerBringToFront } from './screenContainerFunc';

export const screenContainerEvents = (
  event: IBaseEvent,
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
) => {
  if (screenMouse.screen.y > screen.titleBar!.height) {
    screenClientEvents(event, screenMouse, clientMouse, screen);
  } else {
    screenTitleBarEvents(event, screenMouse, clientMouse, screen);
  }

  const mouseDown = () => {
    if (event.button === EnumMouseButton.Left) {
      screenContainerBringToFront(screen);
    }
  };

  switch (event.type) {
    case EnumOSEventType.None:
      break;
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    default:
      break;
  }
};
