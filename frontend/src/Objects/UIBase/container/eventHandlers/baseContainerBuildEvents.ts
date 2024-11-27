import { resetAllButtons } from 'Objects/UIButton/props/buttonFunc';
import { backdropContainerBuildEvents } from '../../../UIBackdrop/container/eventHandlers/backdropContainerBuildEvents';
import { screenContainerBuildEvents } from '../../../UIScreen/container/eventsHandlers/screenContainerBuildEvents';
import { IScreen } from '../../../UIScreen/_props/screenInterface';
import { viewportContainerEvents } from '../../../UIViewport/container/viewportContainerEvents';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IBaseEvent,
} from 'functions/events/IEvents';
import { STATE } from 'constants/globals/state';
import { addEvent, processEvents } from 'functions/events/events';
import { getClientMouse, getScreenMouse } from 'functions/mouse/mouse';

export const baseContainerBuildEvents = (
  _event: IBaseEvent,
  screen?: IScreen
) => {
  _event.persist && _event.persist();
  STATE.events = [];
  addEvent(EnumOSEventObjectType.Base, _event, null, { screen: screen });

  const event = _event;

  if (event.detail === 2) {
    if (event.type === EnumOSEventType.MouseDown) {
      event.type = EnumOSEventType.MouseDoubleClick;
    }
  }

  STATE.clientMouse = getClientMouse(event);

  if (event.target.dataset !== undefined) {
    const { id } = event.target.dataset;

    /* Global Event */
    switch (event.type) {
      case EnumOSEventType.MouseUp:
        STATE.dragScreen = undefined;
        STATE.dragWindow = undefined;
        break;
      default:
        break;
    }

    /* Backdrop */
    if (id === EnumOSEventObjectType.Backdrop) {
      backdropContainerBuildEvents(event);
    }

    /* Screen */
    if (screen) {
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
