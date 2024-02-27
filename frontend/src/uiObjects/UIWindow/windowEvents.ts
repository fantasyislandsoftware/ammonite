import { IScreenMouse } from 'functions/mouse';
import { IScreen } from 'interface/screen';
import { IWindow, IWindowEvent } from './windowInterface';
import { windowClientEvent } from 'uiObjects/UIWindowClient/windowClientEvents';

export const windowEvents = (
  event: any,
  screen: IScreen,
  window: IWindow,
  screenMouse: IScreenMouse
) => {
  const calcEvent: IWindowEvent = {
    x: screenMouse.screen.x - window.position.x,
    y: screenMouse.screen.y - window.position.y,
    button: screenMouse.button,
    type: event.type,
  };

  if (
    calcEvent.x >= window.borderThickness &&
    calcEvent.y >= window.titleBar.height &&
    calcEvent.x <= window.width - window.borderThickness * 2 &&
    calcEvent.y <= window.height - window.borderThickness * 2
  ) {
    windowClientEvent(window, calcEvent);
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
