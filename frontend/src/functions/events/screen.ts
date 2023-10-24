import { setScreen } from 'functions/screen';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IOSEvent,
} from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';

const mouseMove = (osEvent: IOSEvent) => {
  const { object, eventType } = osEvent;
  const { screens, selectedScreen } = useScreenStore.getState();
  const clientMouse = object.clientMouse;
  if (eventType === EnumOSEventType.MouseMove) {
    if (selectedScreen) {
      const screen = screens[selectedScreen.id];
      let newPos = clientMouse.y - selectedScreen.offset.y;
      if (newPos < 0) newPos = 0;
      screen.position = { y: newPos, z: 0 };
      setScreen(screen);
    }
  }
};

export const screenEventHandler = (osEvent: IOSEvent) => {
  const { object } = osEvent;
  if (object.type === EnumOSEventObjectType.Screen) {
    mouseMove(osEvent);
  }
};
