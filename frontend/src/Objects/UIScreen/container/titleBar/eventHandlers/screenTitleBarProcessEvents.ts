import { screenIdToIndex } from 'Objects/UIScreen/_props/screenFunctions';
import { STATE } from 'constants/global';
import { EnumMouseButton } from 'functions/mouse';
import { IEvent, EnumOSEventType } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';
import { screenContainerDrag } from '../../screenContainerFunc';

export const screenTitleBarProcessEvents = (event: IEvent) => {
  const { screens } = useScreenStore.getState();

  const mouseDown = () => {
    switch (event.event.button) {
      case EnumMouseButton.Left:
        if (!event.screen) return;
        const screenIndex = screenIdToIndex(event.screen.screenId);
        if (screenIndex === undefined) return;
        STATE.dragScreen = {
          id: event.screen.screenId,
          offset: {
            y: STATE.clientMouse.y - screens[screenIndex].position.y,
          },
        };
        break;
      default:
    }
  };

  const mouseUp = () => {
    STATE.dragScreen = undefined;
  };

  const mouseMove = () => {
    if (!STATE.dragScreen) return;
    screenContainerDrag();
  };

  switch (event.event.type) {
    case EnumOSEventType.None:
      break;
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseDoubleClick:
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
    default:
      break;
  }
};
