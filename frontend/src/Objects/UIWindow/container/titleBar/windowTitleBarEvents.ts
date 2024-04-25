import { EnumOSEventType } from 'interface/event';
import { setScreen } from 'Objects/UIScreen/_props/screenFunctions';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IWindow, IWindowEvent } from 'Objects/UIWindow/_props/windowInterface';

export const windowTitleBarEvents = (
  screen: IScreen,
  window: IWindow,
  event: IWindowEvent
) => {
  const { x, y, type } = event;

  switch (type) {
    case EnumOSEventType.MouseDown:
      const test = screen;
      test.windows[0].titleBar.title = 'test';
      test.windows[0].position.y = 10;
      setScreen(test);

      break;
    default:
  }
};
