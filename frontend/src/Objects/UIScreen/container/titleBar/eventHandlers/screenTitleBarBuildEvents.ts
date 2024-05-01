import { EnumMouseButton, IClientMouse, IScreenMouse } from 'functions/mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
  IEvent,
} from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';
import { screenContainerDrag } from '../../screenContainerFunc';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import {
  getHighestScreenZIndex,
  screenIdToIndex,
} from 'Objects/UIScreen/_props/screenFunctions';
import { buttonContainerEvents } from 'Objects/UIButton/container/buttonContainerEvents';
import { addEvent } from 'functions/events';

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

export const screenTitleBarBuildEvents = (
  event: IBaseEvent,
  screenMouse: IScreenMouse,
  screen: IScreen
) => {
  addEvent(EnumOSEventObjectType.ScreenTitleBar, event, screen);

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
};
