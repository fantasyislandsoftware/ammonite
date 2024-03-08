import { IScreen } from 'Objects/UIScreen/screenInterface';
import { IWindow, IWindowEvent } from '../../windowInterface';
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
