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
  OSEventBackdrop,
  EnumOSEventObjectType,
  OSEventScreen,
  OSEventScreenTitlebar,
  OSEventScreenClient,
  EnumOSEventType,
  IOSEvent,
  OSEventScreenTitlebarIcon,
  OSEvent,
} from 'interface/event';
import { backdropEventHandler } from './backdrop';
import { screenEventHandler } from './screen';
import { screenTitlebarEventHandler } from './screenTitlebar';
import { viewportEventHandler } from './viewport';
import { screenTitlebarIconEventHandler } from './screenTitlebarIcon';
import { handleViewportEvents } from './eventHandlers/viewport';
import { handleScreenTitleBarEvents } from './eventHandlers/screen/titleBar';
import { handleScreenClientEvents } from './eventHandlers/screen/client';
import { handleBackdropEvents } from './eventHandlers/backdrop';
import {
  handleScreenTitleBarIconEvents,
  resetScreenTitleBarIconEvents,
} from './eventHandlers/screen/titleBar/icon';

export const processObjectEvents = (event: OSEvent, screen?: IScreen) => {
  const clientMouse = getClientMouse(event);

  if (event.type === EnumOSEventType.MouseUp) {
    resetScreenTitleBarIconEvents();
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
      if (screenMouse.screen.y < titleBar.height) {
        /* Titlebar Icons */
        let foundIcon = false;
        titleBar.icons.map((icon) => {
          if (
            screenMouse.screen.x > icon.boundBox.x - 1 &&
            screenMouse.screen.y > icon.boundBox.y - 1 &&
            screenMouse.screen.x < icon.boundBox.x + icon.boundBox.width &&
            screenMouse.screen.y < icon.boundBox.y + icon.boundBox.height
          ) {
            handleScreenTitleBarIconEvents(event, screen, icon);
            foundIcon = true;
          }
        });
        if (foundIcon) return;
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
