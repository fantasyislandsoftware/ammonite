import { IScreenMouse } from 'functions/mouse';
import { IScreen } from 'interface/screen';
import { IWindow, IWindowEvent } from '../windowInterface';
import { windowBorderEvents } from './border/windowBorderEvents';
import { windowBaseEvents } from './base/windowBaseEvents';

export const windowContainerEvents = (
  event: IWindowEvent,
  screen: IScreen,
  window: IWindow,
  screenMouse: IScreenMouse
) => {
  const windowEvent: IWindowEvent = {
    x: screenMouse.screen.x - window.position.x,
    y: screenMouse.screen.y - window.position.y,
    button: screenMouse.button,
    type: event.type,
  };

  console.log('window');

  const { x, y } = windowEvent;
  if (
    x >= window.borderThickness &&
    y > window.borderThickness &&
    x <= window.width - window.borderThickness * 2 &&
    y <= window.height - window.borderThickness * 2
  ) {
    windowBaseEvents(screen, window, windowEvent);
  } else {
    windowBorderEvents();
  }
};
