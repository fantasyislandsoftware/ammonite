import { EnumOSEventType } from 'interface/event';
import { setScreen } from 'Objects/UIScreen/_props/screenFunctions';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IWindow, IWindowEvent } from 'Objects/UIWindow/_props/windowInterface';

export const windowTitleBarEvents = (
  screen: IScreen,
  window: IWindow,
  event: IWindowEvent
) => {
  if (!window.titleBar) return;
};
