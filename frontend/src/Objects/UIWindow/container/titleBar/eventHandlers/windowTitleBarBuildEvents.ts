import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { getPixelArrayDimensions } from 'api/lib/graphics/pixelArray';
import { addEvent } from 'functions/events';
import { IMouse, inBoundary } from 'functions/mouse';
import { EnumOSEventObjectType, IBaseEvent } from 'interface/event';

export const windowTitleBarBuildEvents = (
  event: IBaseEvent,
  window: IWindow,
  windowMouse: IMouse
) => {
  const { titleBar } = window;
  if (!titleBar) return;
  const { pixels, x, y } = titleBar;
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
      window: window,
    });
  }
};
