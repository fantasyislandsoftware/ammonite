import {
  EnumMouseButton,
  IClientMouse,
  IMouse,
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
  screenMouse: IMouse,
  screen: IScreen
) => {
  addEvent(EnumOSEventObjectType.ScreenTitleBar, event, screenMouse, {
    screen: screen,
  });

  const { titleBar } = screen;
  if (!titleBar) return;
  const { buttons } = titleBar;

  /* Buttons */
  buttons.map((button) => {
    buttonContainerBuildEvents(
      event,
      { screen: screen, button: button },
      screenMouse
    );
  });
};
