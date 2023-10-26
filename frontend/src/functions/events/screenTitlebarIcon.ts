import { getLowestScreenZIndex, screenIdToIndex } from 'functions/screen';
import {
  EnumMouseButton,
  EnumOSEventObjectType,
  EnumOSEventType,
  IOSEvent,
} from 'interface/event';
import { screenBringToFront, screenSendToBack } from 'api/os/screen';

const leftMouseButton = (osEvent: IOSEvent) => {
  const { object, parent } = osEvent;
  const screenMouse = object.screenMouse ? object.screenMouse : undefined;
  if (screenMouse?.button === EnumMouseButton.Left) {
    const screenIndex = screenIdToIndex(parent?.id);
    if (screenIndex === undefined) return;
    //getLowestScreenZIndex();
    //console.log(screenIndex);
    //screenSendToBack(screenIndex);
    screenBringToFront(screenIndex);
  }
};

const mouseDown = (osEvent: IOSEvent) => {
  const { eventType } = osEvent;
  if (eventType === EnumOSEventType.MouseDown) {
    leftMouseButton(osEvent);
  }
  //const { object, parent } = osEvent;
  //console.log(object.icon);
  //console.log(parent);
};

export const screenTitlebarIconEventHandler = (osEvent: IOSEvent) => {
  const { object } = osEvent;
  if (object.type === EnumOSEventObjectType.ScreenTitlebarIcon) {
    if (osEvent.eventType === EnumOSEventType.MouseDown) {
      mouseDown(osEvent);
    }
  }
};
