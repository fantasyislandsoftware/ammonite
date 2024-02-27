import {
  IWindow,
  IWindowEvent,
} from '../../uiObjects/UIWindow/windowInterface';
import { IWindowClientEvent } from '../../uiObjects/UIWindowClient/windowClientInterface';

export const windowTitleBarEvent = (window: IWindow, event: IWindowEvent) => {
  console.log('test');
};
