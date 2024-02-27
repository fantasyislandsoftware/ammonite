import { setScreen } from 'functions/screen';
import { EnumOSEventType } from 'interface/event';
import { IScreen } from 'interface/screen';
import { useIntuitionStore } from 'stores/useIntuitionStore';
import { useScreenStore } from 'stores/useScreenStore';
import { IWindow, IWindowEvent } from 'uiObjects/UIWindow/windowInterface';

export const windowTitlebarEvent = (
  screen: IScreen,
  window: IWindow,
  event: IWindowEvent
) => {
  const { x, y, type } = event;

  switch (type) {
    case EnumOSEventType.MouseDown:
      console.log('titlebar mouse down');

      const test = screen;
      test.windows[0].titleBar.title = 'test';
      setScreen(test);

      break;
    default:
  }
};
