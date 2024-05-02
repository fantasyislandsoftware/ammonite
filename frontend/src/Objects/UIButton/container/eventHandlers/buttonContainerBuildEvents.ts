import { EnumOSEventObjectType, IBaseEvent } from 'interface/event';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { addEvent, eventLog } from 'functions/events';
import { IButton } from 'Objects/UIButton/props/buttonInterface';

export const buttonContainerBuildEvents = (
  event: IBaseEvent,
  screen: IScreen,
  button: IButton
) => {
  eventLog(event, EnumOSEventObjectType.Button);
  addEvent(EnumOSEventObjectType.Button, event, {
    screen: screen,
    button: button,
  });

  //const { setSelectedScreen } = useScreenStore.getState();
  //const screenIndex = screenIdToIndex(screen.screenId);
  //if (screenIndex === undefined) return;

  /* Button events */

  /*const mouseDownLeftButton = () => {
    if (x) {
      setSelectedScreen(undefined);
      setButtonDown(button.id);
    }
  };*/

  //const mouseUpLeftButton = () => {
  //console.log(button.state);
  //if (button.state === EnumButtonState.DOWN) {
  //execButtonFunction(screen, button);
  //}
  //const topScreen = getHighestScreenZIndex();
  //if (screen.zIndex == topScreen) {
  //execButtonFunction(screen, button);
  //}
  //};

  /*const mouseDownAnyButton = () => {
    setTimeout(() => {
      setSelectedScreen(undefined);
    });
  };*/

  /* Sort events */

  /*const mouseDown = () => {
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
  };*/

  /*const mouseUp = () => {
    switch (event.button) {
      case EnumMouseButton.Left:
        mouseUpLeftButton();
        break;
      default:
        break;
    }
  };*/

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
