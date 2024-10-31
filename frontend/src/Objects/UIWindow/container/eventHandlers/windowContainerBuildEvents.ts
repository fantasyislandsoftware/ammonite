import { IMouse, inBoundary } from 'functions/mouse';
import { IWindow } from '../../_props/windowInterface';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { addEvent } from 'functions/events';
import { EnumOSEventObjectType, IBaseEvent } from 'interface/event';
import { windowTitleBarBuildEvents } from '../titleBar/eventHandlers/windowTitleBarBuildEvents';
import { getPixelArrayDimensions } from 'api/lib/graphics/pixelArray';
import { windowClientBuildEvents } from '../client/eventHandlers/windowClientBuildEvents';

export const windowContainerBuildEvents = (
  event: IBaseEvent,
  objects: {
    screen?: IScreen;
    window?: IWindow;
  },
  screenClientMouse: IMouse
) => {
  const { screen, window } = objects;
  if (!screen || !window) return;
  const { position, pixels } = window;
  const { x, y } = position;
  const { width, height } = getPixelArrayDimensions(pixels);

  if (inBoundary(screenClientMouse, x, y, x + width, y + height)) {
    const windowMouse: IMouse = {
      position: {
        x: screenClientMouse.position.x - x,
        y: screenClientMouse.position.y - y,
      },
      button: screenClientMouse.button,
    };
    addEvent(EnumOSEventObjectType.Window, event, windowMouse, {
      window: window,
    });
    windowTitleBarBuildEvents(
      event,
      { screen: screen, window: window },
      windowMouse
    );
    windowClientBuildEvents(
      event,
      { screen: screen, window: window },
      windowMouse
    );
  }
};
