import { resetAllButtons } from 'Objects/UIButton/buttonFunc';
import { backdropContainerEvents } from '../../UIBackdrop/container/backdropContainerEvents';
import { screenContainerEvents } from '../../UIScreen/container/screenContainerEvents';
import { IScreen } from '../../UIScreen/_props/screenInterface';
import { viewportContainerEvents } from '../../UIViewport/container/viewportContainerEvents';
import { getClientMouse, getScreenMouse } from 'functions/mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
} from 'interface/event';
import { addEvent, eventLog, processEvents } from 'functions/events';
import { ENV } from 'constants/env';

export const baseContainerEvents = (_event: IBaseEvent, screen?: IScreen) => {
  _event.persist && _event.persist();
  ENV.events = [];
  addEvent(EnumOSEventObjectType.Base, _event, screen);
  processEvents();

  const event = _event;

  if (event.detail === 2) {
    event.type = EnumOSEventType.MouseDoubleClick;
  }

  const clientMouse = getClientMouse(event);
  ENV.clientMouse = getClientMouse(event);

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
