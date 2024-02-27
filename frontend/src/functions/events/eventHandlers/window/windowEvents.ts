import { IScreenMouse } from 'functions/mouse';
import { EnumOSEventType } from 'interface/event';
import { IScreen } from 'interface/screen';
import { IWindow } from 'interface/window';

export const windowEvents = (
  event: any,
  screen: IScreen,
  window: IWindow,
  screenMouse: IScreenMouse
) => {
  const windowEvent = {
    x: screenMouse.screen.x - window.position.x,
    y: screenMouse.screen.y - window.position.y,
    button: screenMouse.button,
    type: event.type,
  };

  //console.log(windowEvent);

  //console.log(windowMouse);
  if (windowEvent.y > window.titleBar.height) {
    //console.log(window.titleBar.height);
  }

  /*const mouseDown = () => {};

  const mouseUp = () => {};

  const mouseMove = () => {};

  switch (event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }*/
};
