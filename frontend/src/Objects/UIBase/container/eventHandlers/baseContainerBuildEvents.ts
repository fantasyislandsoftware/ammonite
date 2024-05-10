import { resetAllButtons } from 'Objects/UIButton/props/buttonFunc';
import { backdropContainerBuildEvents } from '../../../UIBackdrop/container/eventHandlers/backdropContainerBuildEvents';
import { screenContainerBuildEvents } from '../../../UIScreen/container/eventsHandlers/screenContainerBuildEvents';
import { IScreen } from '../../../UIScreen/_props/screenInterface';
import { viewportContainerEvents } from '../../../UIViewport/container/viewportContainerEvents';
import { getClientMouse, getScreenMouse } from 'functions/mouse';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
} from 'interface/event';
import { addEvent, eventLog, processEvents } from 'functions/events';
import { ENV, STATE } from 'constants/global';

export const baseContainerBuildEvents = (
  _event: IBaseEvent,
  screen?: IScreen
) => {
  _event.persist && _event.persist();
  STATE.events = [];
  addEvent(EnumOSEventObjectType.Base, _event, null, { screen: screen });

  const event = _event;

  if (event.detail === 2) {
    event.type = EnumOSEventType.MouseDoubleClick;
  }

  STATE.clientMouse = getClientMouse(event);

  if (event.target.dataset !== undefined) {
    const { id } = event.target.dataset;

    /* Backdrop */
    if (id === EnumOSEventObjectType.Backdrop) {
      backdropContainerBuildEvents(event);
    }

    if (screen) {
      /* Screen */
      const screenMouse = getScreenMouse(event, screen);
      if (id === EnumOSEventObjectType.Screen) {
        screenContainerBuildEvents(event, screenMouse, screen);
      }
    }
  }

  if (event.type === EnumOSEventType.MouseUp) {
    resetAllButtons();
  }

  if (event.target.dataset === undefined) {
    viewportContainerEvents(event);
  }

  processEvents();
};
