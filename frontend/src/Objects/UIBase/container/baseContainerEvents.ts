import { resetAllButtons } from 'Objects/UIButton/buttonContainerFunc';
import { backdropContainerEvents } from '../../UIBackdrop/container/backdropContainerEvents';
import { screenContainerEvents } from '../../UIScreen/container/screenContainerEvents';
import { IScreen } from '../../UIScreen/screenInterface';
import { viewportContainerEvents } from '../../UIViewport/container/viewportContainerEvents';
import { getClientMouse, getScreenMouse } from 'functions/mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
} from 'interface/event';

export const baseContainerEvents = (_event: IBaseEvent, screen?: IScreen) => {
  const event = _event;

  if (event.detail === 2) {
    event.type = EnumOSEventType.MouseDoubleClick;
  }

  const clientMouse = getClientMouse(event);

  if (event.target.dataset !== undefined) {
    const { id } = event.target.dataset;

    /* Backdrop */
    if (id === EnumOSEventObjectType.Backdrop) {
      backdropContainerEvents(event, clientMouse);
    }

    if (!screen) return;
    const screenMouse = getScreenMouse(event, screen);

    /* Screen */
    if (id === EnumOSEventObjectType.Screen) {
      screenContainerEvents(event, screenMouse, clientMouse, screen);
    }
  }

  if (event.type === EnumOSEventType.MouseUp) {
    resetAllButtons();
  }

  if (event.target.dataset === undefined) {
    viewportContainerEvents(event);
  }
};
