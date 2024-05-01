import {
  EnumMouseButton,
  IClientMouse,
  IScreenMouse,
  inBoundary,
} from 'functions/mouse';
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
import { buttonContainerBuildEvents } from 'Objects/UIButton/container/eventHandlers/buttonContainerBuildEvents';
import { addEvent } from 'functions/events';

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
      buttonContainerBuildEvents(
        event,
        screen,
        button,
        screen.zIndex === topScreen
      );
    }
  });
};
