import { IScreen } from 'interface/screen';
import { IWindow, IWindowEvent } from '../../../windowInterface';
import { windowClientEvent } from './client/windowClientEvents';
import { windowTitlebarEvent } from './titlebar/windowTitlebarEvents';

export const windowBaseEvents = (
  screen: IScreen,
  window: IWindow,
  windowEvent: IWindowEvent
) => {
  const { y } = windowEvent;
  if (y <= window.titleBar.height) {
    windowTitlebarEvent(screen, window, windowEvent);
  } else {
    windowClientEvent();
  }
};
