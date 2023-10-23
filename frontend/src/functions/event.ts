import { IScreen, IScreenAspect } from 'interface/screen';
import {
  EnumMouseButton,
  IClientMouse,
  IScreenMouse,
  getClientMouse,
  getScreenMouse,
} from './mouse';
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
import { screenBringToFront } from 'api/os/screen';

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
  screen?: IScreen,
  aspect?: IScreenAspect
) => {
  const clientMouse = getClientMouse(event);

  if (screen) {
    const screenMouse = getScreenMouse(event, screen, aspect);

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
  const { object, parent, eventType } = osEvent;
  const clientMouse = object.clientMouse;
  const screenMouse = object.screenMouse ? object.screenMouse : undefined;

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
    if (
      eventType === EnumOSEventType.MouseDown &&
      screenMouse?.button === EnumMouseButton.Left
    ) {
      if (parent !== undefined && parent?.id !== undefined) {
        const screenIndex = screenIdToIndex(parent.id);
        if (screenIndex === undefined) return;
        screenBringToFront(screenIndex);
        setSelectedScreen({
          id: parent.id,
          offset: {
            y: parent.clientMouse.y - screens[screenIndex].position.y,
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
