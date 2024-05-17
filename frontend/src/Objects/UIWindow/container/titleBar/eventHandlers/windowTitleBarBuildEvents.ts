import { buttonContainerBuildEvents } from 'Objects/UIButton/container/eventHandlers/buttonContainerBuildEvents';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { getPixelArrayDimensions } from 'api/lib/graphics/pixelArray';
import { addEvent } from 'functions/events';
import { IMouse, inBoundary } from 'functions/mouse';
import { EnumOSEventObjectType, IBaseEvent } from 'interface/event';

export const windowTitleBarBuildEvents = (
  event: IBaseEvent,
  objects: {
    screen?: IScreen;
    window?: IWindow;
  },
  windowMouse: IMouse
) => {
  const { screen, window } = objects;
  if (!screen || !window) return;
  const { titleBar } = window;
  if (!titleBar) return;
  const { pixels, x, y, buttons } = titleBar;
  const { width, height } = getPixelArrayDimensions(pixels);

  if (inBoundary(windowMouse, x, y, x + width, y + height)) {
    const titleBarMouse: IMouse = {
      position: {
        x: windowMouse.position.x - x,
        y: windowMouse.position.y - y,
      },
      button: windowMouse.button,
    };
    addEvent(EnumOSEventObjectType.WindowTitleBar, event, titleBarMouse, {
      screen: screen,
      window: window,
    });
    /* Buttons */
    buttons.map((button) => {
      buttonContainerBuildEvents(
        event,
        {
          screen: screen,
          window: window,
          button: button,
        },
        titleBarMouse
      );
    });
  }
};
