import { EnumOSEventType } from 'interface/event';
import { setScreen } from 'Objects/UIScreen/screenFunctions';
import { IScreen } from 'Objects/UIScreen/screenInterface';
import { IWindow, IWindowEvent } from 'Objects/UIWindow/windowInterface';

export const windowTitleBarEvents = (
  screen: IScreen,
  window: IWindow,
  event: IWindowEvent
) => {
  const { x, y, type } = event;

  switch (type) {
    case EnumOSEventType.MouseDown:
      console.log('titleBar mouse down');

      const test = screen;
      test.windows[0].titleBar.title = 'test';
      test.windows[0].position.y = 10;
      setScreen(test);

      break;
    default:
  }
};
