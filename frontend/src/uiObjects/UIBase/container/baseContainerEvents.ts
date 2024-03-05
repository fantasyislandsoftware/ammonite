import { backdropContainerEvents } from '../../../UIObjects/UIBackdrop/container/backdropContainerEvents';
import { screenContainerEvents } from '../../../UIObjects/UIScreen/container/screenContainerEvents';
import { IScreen } from '../../../UIObjects/UIScreen/screenInterface';
import { viewportContainerEvents } from '../../../UIObjects/UIViewport/container/viewportContainerEvents';
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

  if (event.target.dataset === undefined) {
    viewportContainerEvents(event);
  }
};
