import { useScreenStore } from '../components/Screen/useScreenStore';
import { IMouse } from './mouse';
import { screenIdToIndex } from './screen';

export interface IOSEvent {
  object: EnumOSEventObjectType;
  id?: number;
  name?: string;
  type: EnumOSEventType;
  mouse?: IMouse;
  parent?: {
    object: EnumOSEventObjectType;
    id: number;
  };
}

export enum EnumOSEventType {
  MouseClick = 'mouseclick',
  MouseDown = 'mousedown',
  MouseUp = 'mouseup',
  MouseMove = 'mousemove',
  MouseLeave = 'mouseleave',
}

export enum EnumMouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}

export enum EnumOSEventObjectType {
  Screen = 'screen',
  Window = 'window',
  Titlebar = 'titlebar',
  Client = 'client',
  Icon = 'icon',
}

const processObject = (osEvent: IOSEvent) => {
  switch (osEvent.object) {
    case EnumOSEventObjectType.Screen:
      processScreenEvent(osEvent);
      break;
  }
};

export const osEventHandler = (osEvent: IOSEvent) => {
  if (osEvent.parent) {
    processParent(osEvent);
  } else {
    processObject(osEvent);
  }
};

const processParent = (osEvent: IOSEvent) => {
  switch (osEvent.parent?.object) {
    case EnumOSEventObjectType.Screen:
      switch (osEvent.object) {
        case EnumOSEventObjectType.Client:
          break;
        case EnumOSEventObjectType.Titlebar:
          processTitleBarEvent(osEvent);
          break;
      }
      break;
  }
};

const processTitleBarEvent = (osEvent: IOSEvent) => {
  const { screens, setDragScreen } = useScreenStore.getState();
  if (!osEvent.parent) return;
  const screenIndex = screenIdToIndex(osEvent.parent.id);
  if (!screenIndex) return;
  switch (osEvent.type) {
    /* Mouse Down */
    case EnumOSEventType.MouseDown:
      /* Set screen to highest z-index */
      //const newIndex = getHighestScreenZIndex() + 1;
      //screens[screenIndex].zIndex = newIndex;
      //setScreens([...screens]);
      /* Set drag screen */
      if (osEvent.mouse) {
        setDragScreen({
          id: osEvent.parent.id,
          offset: {
            y: osEvent.mouse.client.y - screens[screenIndex].position.y,
          },
        });
      }
      break;
    /* Mouse Up */
    case EnumOSEventType.MouseUp:
      setDragScreen(undefined);
      break;
  }
};

const processScreenEvent = (osEvent: IOSEvent) => {
  const { screens, setScreens, dragScreen } = useScreenStore.getState();
  const screenIndex = screenIdToIndex(dragScreen?.id!);
  if (!screenIndex) return;
  if (!osEvent.mouse) return;
  switch (osEvent.type) {
    /* Mouse Move */
    case EnumOSEventType.MouseMove:
      if (dragScreen) {
        screens[screenIndex].position.y =
          osEvent.mouse.client.y - dragScreen.offset.y;
        if (screens[screenIndex].position.y < 0)
          screens[screenIndex].position.y = 0;
        setScreens([...screens]);
        break;
      }
  }
};
