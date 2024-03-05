import { setScreen } from 'functions/screen';
import { EnumOSEventType } from 'interface/event';
import { IScreen } from 'UIObjects/UIScreen/screenInterface';
import { IWindow, IWindowEvent } from 'UIObjects/UIWindow/windowInterface';

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
