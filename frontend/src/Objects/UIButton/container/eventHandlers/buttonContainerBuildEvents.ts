import { EnumOSEventObjectType, IBaseEvent } from 'functions/events/IEvents';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IButton } from 'Objects/UIButton/props/buttonInterface';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { addEvent } from 'functions/events/events';
import { IMouse } from 'functions/mouse/IMouse';
import { inBoundary } from 'functions/mouse/mouse';

export const buttonContainerBuildEvents = (
  event: IBaseEvent,
  objects: {
    screen?: IScreen;
    window?: IWindow;
    button?: IButton;
  },
  parentMouse: IMouse
) => {
  const { button } = objects;
  if (!button) return;
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
      screen: objects.screen!,
      window: objects.window!,
      button: button,
    });
  }
};
