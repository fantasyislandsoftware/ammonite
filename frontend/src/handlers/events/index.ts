import { IScreen } from 'interface/screen';
import {
  IClientMouse,
  IScreenMouse,
  getClientMouse,
  getScreenMouse,
} from '../mouse';
import {
  OSEventScreen,
  EnumOSEventObjectType,
  OSEventScreenTitlebar,
  EnumOSEventType,
  IOSEvent,
  OSEventScreenClient,
  OSEventBackdrop,
} from './interface';
import { screenIdToIndex } from 'handlers/screen';
import { useScreenStore } from 'stores/useScreenStore';

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
  const { object, parent, eventType } = osEvent;
  const { clientMouse } = object;

  const { screens, setScreens, setSelectedScreen, selectedScreen } =
    useScreenStore.getState();

  /* Backdrop */
  if (object.type === EnumOSEventObjectType.Backdrop) {
    /* Mouse Down */
    if (eventType === EnumOSEventType.MouseMove) {
      if (selectedScreen !== undefined) {
        const newState = screens.map((screen: IScreen) => {
          if (screen.id === selectedScreen.id) {
            let newPos = clientMouse.y - selectedScreen.offset.y;
            if (newPos < 0) newPos = 0;
            return {
              ...screen,
              position: { y: newPos, z: 0 },
            };
          }
          return screen;
        });
        setScreens(newState);
      }
    }
  }

  /* Screen */
  if (object.type === EnumOSEventObjectType.Screen) {
    /* Mouse Move */
    if (eventType === EnumOSEventType.MouseMove) {
      if (selectedScreen) {
        const newState = screens.map((screen: IScreen) => {
          if (screen.id === selectedScreen.id) {
            let newPos = clientMouse.y - selectedScreen.offset.y;
            if (newPos < 0) newPos = 0;
            return {
              ...screen,
              position: { y: newPos, z: 0 },
            };
          }
          return screen;
        });
        setScreens(newState);
      }
    }
  }

  /* Screen Titlebar */
  if (object.type === EnumOSEventObjectType.ScreenTitlebar) {
    /* Mouse Down */
    if (eventType === EnumOSEventType.MouseDown) {
      if (parent !== undefined && parent?.id !== undefined) {
        const screenIndex = screenIdToIndex(parent.id);
        setSelectedScreen({
          id: parent.id,
          offset: {
            y: parent.clientMouse.y - screens[screenIndex!].position.y,
          },
        });
      }
    }
    /* Mouse Up */
    if (eventType === EnumOSEventType.MouseUp) {
      setSelectedScreen(undefined);
    }
  }
};
