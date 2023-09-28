import { IScreen } from 'components/Screen/interface';
import { IMouse, getMouse } from '../mouse';
import {
  OSEventScreen,
  EnumOSEventObjectType,
  OSEventScreenTitlebar,
  EnumOSEventType,
  IOSEvent,
  OSEventScreenClient,
} from './interface';
import { useScreenStore } from 'components/Screen/useScreenStore';
import { screenIdToIndex } from 'handlers/screen';

const createScreenEventObject = (
  mouse: IMouse,
  screen: IScreen
): OSEventScreen => {
  return {
    type: EnumOSEventObjectType.Screen,
    id: screen.id,
    mouse: mouse,
  };
};

const createScreenTitlebarEventObject = (
  mouse: IMouse
): OSEventScreenTitlebar => {
  return {
    type: EnumOSEventObjectType.ScreenTitlebar,
    mouse: mouse,
  };
};

const createScreenClientEventObject = (mouse: IMouse): OSEventScreenClient => {
  return {
    type: EnumOSEventObjectType.ScreenClient,
    mouse: mouse,
  };
};

export const processObjectEvents = (
  event: any,
  eventType: EnumOSEventType,
  screen: IScreen
) => {
  const mouse = getMouse(event, screen);
  const { titleBar } = screen;
  /* Screen */
  osEventHandler({
    object: createScreenEventObject(mouse, screen),
    parent: undefined,
    eventType: eventType,
  });
  /* Screen Titlebar or Screen Client */
  osEventHandler({
    object:
      titleBar && mouse.screen.y < titleBar.height
        ? createScreenTitlebarEventObject(mouse)
        : createScreenClientEventObject(mouse),
    parent: createScreenEventObject(mouse, screen),
    eventType: eventType,
  });
};

export const osEventHandler = (osEvent: IOSEvent) => {
  const { object, parent, eventType } = osEvent;
  const { mouse } = object;

  const { screens, setScreens, setSelectedScreen, selectedScreen } =
    useScreenStore.getState();

  /* Screen */
  if (object.type === EnumOSEventObjectType.Screen) {
    /* Mouse Move */
    if (eventType === EnumOSEventType.MouseMove) {
      if (selectedScreen) {
        const newState = screens.map((screen: IScreen) => {
          if (screen.id === selectedScreen.id) {
            let newPos = mouse.client.y - selectedScreen.offset.y;
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
            y: parent.mouse.client.y - screens[screenIndex!].position.y,
          },
        });
      }
    }
    /* Mouse Up */
    if (eventType === EnumOSEventType.MouseUp) {
      setSelectedScreen(undefined);
    }

    /* Mouse Move */
    if (eventType === EnumOSEventType.MouseMove) {
      /*if (selectedScreen) {
        const newState = screens.map((screen: IScreen) => {
          if (screen.id === selectedScreen.id) {
            return {
              ...screen,
              position: { y: mouse.client.y - selectedScreen.offset.y, z: 0 },
            };
          }
          return screen;
        });
        setScreens(newState);
      }*/
    }
  }
};
