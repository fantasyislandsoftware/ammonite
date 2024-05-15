import { EnumOSEventObjectType, IBaseEvent } from 'interface/event';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { addEvent, eventLog } from 'functions/events';
import { IButton } from 'Objects/UIButton/props/buttonInterface';
import { IMouse, inBoundary } from 'functions/mouse';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';

export const buttonContainerBuildEvents = (
  event: IBaseEvent,
  screen: IScreen | null,
  window: IWindow | null,
  button: IButton,
  parentMouse: IMouse
) => {
  const { x, y, w, h } = button;

  if (inBoundary(parentMouse, x, y, x + w, y + h)) {
    const buttonMouse: IMouse = {
      position: {
        x: parentMouse.position.x - x,
        y: parentMouse.position.y - y,
      },
      button: parentMouse.button,
    };
    addEvent(EnumOSEventObjectType.Button, event, buttonMouse, {
      screen: screen!,
      window: window!,
      button: button,
    });
  }
};
