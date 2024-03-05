import { setScreen } from 'src/functions/screen';
import { EnumOSEventType } from 'src/interface/event';
import { IScreen } from 'src/UIObjects/UIScreen/screenInterface';
import { IWindow, IWindowEvent } from 'src/UIObjects/UIWindow/windowInterface';

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
