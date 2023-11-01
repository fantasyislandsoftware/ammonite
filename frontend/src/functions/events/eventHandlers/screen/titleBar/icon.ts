import { screenSendToBack } from 'api/os/screen';
import { ENV } from 'constants/env';
import { eventLog } from 'functions/events/debug';
import { setScreen } from 'functions/screen';
import { EnumMouseButton, EnumOSEventType, OSEvent } from 'interface/event';
import { EnumIconFunction } from 'interface/icon';
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
      switch (icon.id) {
        case EnumIconFunction.order:
          icon.currentImageIndex = 1;
          break;
        case EnumIconFunction.maximize:
          icon.currentImageIndex = 1;
          break;
      }
      setScreen(screen);
    }
  };

  const mouseUp = () => {
    switch (icon.id) {
      case EnumIconFunction.order:
        screenSendToBack(screen);
        break;
      case EnumIconFunction.maximize:
        screen.position.y = 0;
        setScreen(screen);
        break;
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
