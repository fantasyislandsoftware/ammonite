import { screenBringToFront } from 'api/os/screen';
import { screenIdToIndex } from 'functions/screen';
import {
  EnumMouseButton,
  EnumOSEventObjectType,
  EnumOSEventType,
  IOSEvent,
} from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';

const leftMouseButton = (osEvent: IOSEvent) => {
  const { object, parent } = osEvent;
  const { screens, setSelectedScreen } = useScreenStore.getState();
  const screenMouse = object.screenMouse ? object.screenMouse : undefined;
  if (screenMouse?.button === EnumMouseButton.Left) {
    if (parent !== undefined && parent?.id !== undefined) {
      const screenIndex = screenIdToIndex(parent.id);
      if (screenIndex === undefined) return;
      //screenBringToFront(screenIndex);
      parent.clientMouse &&
        setSelectedScreen({
          id: parent.id,
          offset: {
            y: parent.clientMouse.y - screens[screenIndex].position.y,
          },
        });
    }
  }
};

const mouseDown = (osEvent: IOSEvent) => {
  const { eventType } = osEvent;
  if (eventType === EnumOSEventType.MouseDown) {
    leftMouseButton(osEvent);
  }
};

const mouseUp = (osEvent: IOSEvent) => {
  const { eventType } = osEvent;
  const { setSelectedScreen } = useScreenStore.getState();
  if (eventType === EnumOSEventType.MouseUp) {
    setSelectedScreen(undefined);
  }
};

export const screenTitlebarEventHandler = (osEvent: IOSEvent) => {
  const { object } = osEvent;
  if (object.type === EnumOSEventObjectType.ScreenTitlebar) {
    mouseDown(osEvent);
    mouseUp(osEvent);
  }
};
