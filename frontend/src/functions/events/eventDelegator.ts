import { IScreen, IScreenAspect } from 'interface/screen';
import {
  EnumMouseButton,
  IClientMouse,
  IScreenMouse,
  getClientMouse,
  getScreenMouse,
} from '../mouse';
import { screenIdToIndex } from 'functions/screen';
import { useScreenStore } from 'stores/useScreenStore';
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  OSEvent,
} from 'interface/event';
import { handleViewportEvents } from './eventHandlers/viewport';
import { handleScreenTitleBarEvents } from './eventHandlers/screen/titleBar';
import { handleScreenClientEvents } from './eventHandlers/screen/client';
import { handleBackdropEvents } from './eventHandlers/backdrop';
import {
  handleScreenTitleBarButtonEvents,
  resetScreenTitleBarButtonEvents,
} from './eventHandlers/screen/titleBar/button';
import { windowEvents } from './eventHandlers/window/windowEvents';

export const delegateEvents = (_event: OSEvent, screen?: IScreen) => {
  const event = _event;

  if (event.detail === 2) {
    event.type = EnumOSEventType.MouseDoubleClick;
  }

  const clientMouse = getClientMouse(event);

  if (event.type === EnumOSEventType.MouseUp) {
    resetScreenTitleBarButtonEvents();
  }

  if (event.target.dataset !== undefined) {
    const { id } = event.target.dataset;

    /* Backdrop */
    if (id === EnumOSEventObjectType.Backdrop) {
      handleBackdropEvents(event, clientMouse);
    }

    if (!screen) return;
    const { titleBar } = screen;
    if (!titleBar) return;
    const screenMouse = getScreenMouse(event, screen);

    /* Screen */
    if (id === EnumOSEventObjectType.Screen) {
      /* Windows */
      screen.windows.map((window) => {
        if (
          screenMouse.screen.x >= window.position.x &&
          screenMouse.screen.y >= window.position.y &&
          screenMouse.screen.x <= window.position.x + window.width &&
          screenMouse.screen.y <= window.position.y + window.height
        ) {
          windowEvents(event, screen, window, screenMouse);
        }
      });

      if (screenMouse.screen.y < titleBar.height) {
        /* Titlebar Icons */
        let foundButton = false;
        titleBar.buttons.map((button) => {
          if (
            screenMouse.screen.x > button.boundBox.x - 1 &&
            screenMouse.screen.y > button.boundBox.y - 1 &&
            screenMouse.screen.x < button.boundBox.x + button.boundBox.width &&
            screenMouse.screen.y < button.boundBox.y + button.boundBox.height
          ) {
            handleScreenTitleBarButtonEvents(event, screen, button);
            foundButton = true;
          }
        });
        if (foundButton) return;
        /* Titlebar */
        handleScreenTitleBarEvents(event, screen, clientMouse);
      } else {
        /* Screen Client */
        handleScreenClientEvents(event, screen, clientMouse);
      }
    }
  }

  if (event.target.dataset === undefined) {
    handleViewportEvents(event);
    //console.log(event.type);
    //resetScreenTitleBarIconEvents();
  }
};
