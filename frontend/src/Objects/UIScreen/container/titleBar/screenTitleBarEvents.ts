import { EnumMouseButton, IClientMouse, IScreenMouse } from 'functions/mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
  IEvent,
} from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';
import {
  screenContainerBringToFront,
  screenContainerDrag,
  screenContainerSetYToTop,
} from '../screenContainerFunc';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import {
  getHighestScreenZIndex,
  screenIdToIndex,
} from 'Objects/UIScreen/_props/screenFunctions';
import { buttonContainerEvents } from 'Objects/UIButton/container/buttonContainerEvents';
import { addEvent, eventLog } from 'functions/events';
import { ENV } from 'constants/env';

const inBoundary = (
  screenMouse: IScreenMouse,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return (
    screenMouse.screen.x > x1 &&
    screenMouse.screen.x < x2 &&
    screenMouse.screen.y > y1 &&
    screenMouse.screen.y < y2
  );
};

export const screenTitleBarEvents = (
  event: IBaseEvent,
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
) => {
  eventLog(event, EnumOSEventObjectType.ScreenTitleBar);
  addEvent(EnumOSEventObjectType.ScreenTitleBar, event, screen);

  const { setSelectedScreen, screens } = useScreenStore.getState();
  const screenIndex = screenIdToIndex(screen.screenId);
  if (screenIndex === undefined) return;

  const topScreen = getHighestScreenZIndex();

  /* Button events */
  screen.titleBar?.buttons.map((button) => {
    if (
      inBoundary(
        screenMouse,
        button.x,
        button.y,
        button.x + button.w,
        button.y + button.h
      )
    ) {
      buttonContainerEvents(event, screen, button, screen.zIndex === topScreen);
    }
  });

  const mouseDown = () => {
    setSelectedScreen({
      id: screen.screenId,
      offset: {
        y: clientMouse.y - screens[screenIndex].position.y,
      },
    });
  };

  const mouseUp = () => {
    setSelectedScreen(undefined);
  };

  const mouseMove = () => {
    screenContainerDrag(clientMouse);
  };
};

export const processScreenTitleBarEvents = (event: IEvent) => {
  const { setSelectedScreen, screens } = useScreenStore.getState();

  const mouseDown = () => {
    switch (event.event.button) {
      case EnumMouseButton.Left:
        if (!event.screen) return;
        console.log(ENV.clientMouse);
        const screenIndex = screenIdToIndex(event.screen.screenId);
        if (screenIndex === undefined) return;
        //console.log('left mouse down');
        setSelectedScreen({
          id: event.screen.screenId,
          offset: {
            y: ENV.clientMouse.y - screens[screenIndex].position.y,
          },
        });
        break;
      default:
    }
  };

  switch (event.event.type) {
    case EnumOSEventType.None:
      break;
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      break;
    case EnumOSEventType.MouseDoubleClick:
      break;
    case EnumOSEventType.MouseMove:
      break;
    default:
      break;
  }
};
