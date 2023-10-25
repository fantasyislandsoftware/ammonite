import { IScreen, IScreenAspect } from 'interface/screen';
import {
  EnumMouseButton,
  IClientMouse,
  IScreenMouse,
  getClientMouse,
  getScreenMouse,
} from '../mouse';
import { screenIdToIndex } from 'functions/screen';
import { useScreenStore } from 'stores/useScreenStore';
import {
  OSEventBackdrop,
  EnumOSEventObjectType,
  OSEventScreen,
  OSEventScreenTitlebar,
  OSEventScreenClient,
  EnumOSEventType,
  IOSEvent,
} from 'interface/event';
import { backdropEventHandler } from './backdrop';
import { screenEventHandler } from './screen';
import { screenTitlebarEventHandler } from './screenTitlebar';
import { viewportEventHandler } from './viewport';

const createBackdropEventObject = (
  clientMouse: IClientMouse
): OSEventBackdrop => {
  return {
    type: EnumOSEventObjectType.Backdrop,
    clientMouse: clientMouse,
  };
};

const createScreenEventObject = (
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
): OSEventScreen => {
  return {
    type: EnumOSEventObjectType.Screen,
    id: screen.id,
    screenMouse: screenMouse,
    clientMouse: clientMouse,
  };
};

const createScreenTitlebarEventObject = (
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse
): OSEventScreenTitlebar => {
  return {
    type: EnumOSEventObjectType.ScreenTitlebar,
    screenMouse: screenMouse,
    clientMouse: clientMouse,
  };
};

const createScreenClientEventObject = (
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse
): OSEventScreenClient => {
  return {
    type: EnumOSEventObjectType.ScreenClient,
    screenMouse: screenMouse,
    clientMouse: clientMouse,
  };
};

export const processObjectEvents = (
  event: any,
  eventType: EnumOSEventType,
  screen?: IScreen
) => {
  const clientMouse = getClientMouse(event);

  if (eventType === EnumOSEventType.MouseExit) {
    osEventHandler({
      object: {
        type: EnumOSEventObjectType.Viewport,
        clientMouse: clientMouse,
      },
      parent: undefined,
      eventType: eventType,
    });
  }

  if (screen) {
    const screenMouse = getScreenMouse(event, screen);
    const { titleBar } = screen;

    /* Backdrop */
    osEventHandler({
      object: {
        type: EnumOSEventObjectType.Backdrop,
        screenMouse: screenMouse,
        clientMouse: clientMouse,
      },
      parent: undefined,
      eventType: eventType,
    });

    /* Screen */
    osEventHandler({
      object: createScreenEventObject(screenMouse, clientMouse, screen),
      parent: undefined,
      eventType: eventType,
    });
    /* Screen Titlebar or Screen Client */
    if (titleBar && screenMouse.screen.y < titleBar.height) {
      osEventHandler({
        object: createScreenTitlebarEventObject(screenMouse, clientMouse),
        parent: createScreenEventObject(screenMouse, clientMouse, screen),
        eventType: eventType,
      });
      /* Titlebar Icons */
      titleBar.icons.map((icon) => {
        if (
          screenMouse.screen.x > icon.boundBox.x &&
          screenMouse.screen.y > icon.boundBox.y &&
          screenMouse.screen.x < icon.boundBox.x + icon.boundBox.width &&
          screenMouse.screen.y < icon.boundBox.y + icon.boundBox.height
        ) {
          //console.log(icon.id);
        }
      });
    } else {
      osEventHandler({
        object: createScreenClientEventObject(screenMouse, clientMouse),
        parent: createScreenEventObject(screenMouse, clientMouse, screen),
        eventType: eventType,
      });
    }
  } else {
    osEventHandler({
      object: createBackdropEventObject(clientMouse),
      parent: undefined,
      eventType: eventType,
    });
  }
};

export const osEventHandler = (osEvent: IOSEvent) => {
  viewportEventHandler(osEvent);
  backdropEventHandler(osEvent);
  screenEventHandler(osEvent);
  screenTitlebarEventHandler(osEvent);
};
