import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { getPixelArrayDimensions } from 'functions/graphics/pixelArray';
import { addEvent } from 'functions/events/events';
import { EnumOSEventObjectType, IBaseEvent } from 'functions/events/IEvents';
import { IMouse } from 'functions/mouse/IMouse';
import { inBoundary } from 'functions/mouse/mouse';

export const windowClientBuildEvents = (
  event: IBaseEvent,
  objects: {
    screen?: IScreen;
    window?: IWindow;
  },
  windowMouse: IMouse
) => {
  const { screen, window } = objects;
  if (!screen || !window) return;
  const { client } = window;
  const { pixels, x, y } = client;
  const { width, height } = getPixelArrayDimensions(pixels);
  if (inBoundary(windowMouse, x, y, x + width, y + height)) {
    const clientMouse: IMouse = {
      position: {
        x: windowMouse.position.x - x,
        y: windowMouse.position.y - y,
      },
      button: windowMouse.button,
    };
    addEvent(EnumOSEventObjectType.WindowClient, event, clientMouse, {
      screen: screen,
      window: window,
    });
  }
};
