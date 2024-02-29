import { IScreen } from 'interface/screen';
import { getClientMouse, getScreenMouse } from '../mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  OSEvent,
} from 'interface/event';
import { screenContainerEvents } from 'UIObjects/UIScreen/container/screenContainerEvents';
import { viewportContainerEvents } from 'UIObjects/UIViewport/container/viewportContainerEvents';
import { backdropContainerEvents } from 'UIObjects/UIBackdrop/container/backdropContainerEvents';

export const delegateEvents = (_event: OSEvent, screen?: IScreen) => {
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
