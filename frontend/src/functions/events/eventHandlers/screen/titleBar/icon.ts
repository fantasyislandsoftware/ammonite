import { screenSendToBack } from 'api/os/screen';
import { ENV } from 'constants/env';
import { eventLog } from 'functions/events/debug';
import { setScreen } from 'functions/screen';
import { EnumMouseButton, EnumOSEventType, OSEvent } from 'interface/event';
import { IIcon } from 'interface/intuition';
import { IScreen } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';

export const resetScreenTitleBarIconEvents = () => {
  const { screens } = useScreenStore.getState();
  screens.map((screen: IScreen) => {
    screen.titleBar?.icons.map((icon) => {
      icon.currentImageIndex = 0;
    });
  });
};

export const handleScreenTitleBarIconEvents = (
  event: OSEvent,
  screen: IScreen,
  icon: IIcon
) => {
  eventLog(event, 'Screen Titlebar Icon');

  const mouseDown = () => {
    if (event.button === EnumMouseButton.Left) {
      if (icon.id === 'sendToBack') {
        icon.currentImageIndex = 1;
        setScreen(screen);
      }
    }
  };

  const mouseUp = () => {
    if (icon.id === 'sendToBack') {
      screenSendToBack(screen);
    }
  };

  const mouseMove = () => {};

  switch (event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }
};
