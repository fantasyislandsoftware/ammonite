import { EnumMouseButton, IClientMouse, IScreenMouse } from 'functions/mouse';
import { EnumOSEventType, IBaseEvent } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';
import {
  screenContainerBringToFront,
  screenContainerDrag,
  screenContainerSetYToTop,
} from '../screenContainerFunc';
import { IScreen } from 'Objects/UIScreen/screenInterface';
import {
  getHighestScreenZIndex,
  screenIdToIndex,
} from 'Objects/UIScreen/screenFunctions';
import { buttonContainerEvents } from 'Objects/UIButton/container/buttonContainerEvents';

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

  switch (event.type) {
    case EnumOSEventType.None:
      break;
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
    default:
      break;
  }
};
