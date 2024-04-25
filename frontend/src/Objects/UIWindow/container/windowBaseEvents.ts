import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IWindow, IWindowEvent } from '../_props/windowInterface';
import { windowClientEvents } from './client/windowClientEvents';
import { windowTitleBarEvents } from './titleBar/windowTitleBarEvents';

export const windowBaseEvents = (
  screen: IScreen,
  window: IWindow,
  windowEvent: IWindowEvent
) => {
  const { y } = windowEvent;
  if (y <= window.titleBar.height) {
    windowTitleBarEvents(screen, window, windowEvent);
  } else {
    windowClientEvents();
  }
};
