import { IWindow, IWindowEvent } from 'uiObjects/UIWindow/windowInterface';
import { IWindowClientEvent } from './windowClientInterface';

export const windowClientEvent = (window: IWindow, event: IWindowEvent) => {
  const calcEvent: IWindowClientEvent = {
    x: event.x - window.borderThickness,
    y: event.y - window.titleBar.height,
    button: event.button,
    type: event.type,
  };

  console.log(calcEvent.x);
};
