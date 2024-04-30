import {
  EnumMouseButton,
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
} from 'interface/event';
import { EnumButtonState, IButton } from '../buttonInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { execButtonFunction, setButtonDown } from '../buttonFunc';
import { screenContainerBringToFront } from 'Objects/UIScreen/container/screenContainerFunc';
import {
  getHighestScreenZIndex,
  screenIdToIndex,
} from 'Objects/UIScreen/_props/screenFunctions';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { addEvent, eventLog } from 'functions/events';

export const buttonContainerEvents = (
  event: IBaseEvent,
  screen: IScreen,
  button: IButton,
  x: boolean
) => {
  eventLog(event, EnumOSEventObjectType.Button);
  addEvent(EnumOSEventObjectType.Button, event);

  const { setSelectedScreen } = useScreenStore.getState();
  const screenIndex = screenIdToIndex(screen.screenId);
  if (screenIndex === undefined) return;

  /* Button events */

  const mouseDownLeftButton = () => {
    //console.log(x);
    if (x) {
      setSelectedScreen(undefined);
      setButtonDown(button.id);
    }
  };

  const mouseUpLeftButton = () => {
    //console.log(button.state);
    if (button.state === EnumButtonState.DOWN) {
      execButtonFunction(screen, button);
    }
    //const topScreen = getHighestScreenZIndex();
    //if (screen.zIndex == topScreen) {
    //execButtonFunction(screen, button);
    //}
  };

  const mouseDownAnyButton = () => {
    setTimeout(() => {
      setSelectedScreen(undefined);
    });
  };

  /* Sort events */

  const mouseDown = () => {
    mouseDownAnyButton();
    switch (event.button) {
      case EnumMouseButton.Left:
        mouseDownLeftButton();
        break;
      case EnumMouseButton.Right:
        break;
      default:
        break;
    }
  };

  const mouseUp = () => {
    switch (event.button) {
      case EnumMouseButton.Left:
        mouseUpLeftButton();
        break;
      default:
        break;
    }
  };

  /*switch (event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    default:
      break;
  }*/
};
