import { screenBringToFront, screenSendToBack } from 'api/os/screen';
import { eventLog } from 'functions/events/debug';
import { getLowestScreenZIndex, setScreen } from 'functions/screen';
import { EnumMouseButton, EnumOSEventType, OSEvent } from 'interface/event';
import { EnumButtonFunction } from 'interface/icon';
import { IButton } from 'interface/intuition';
import { IScreen } from 'interface/screen';
import { useIntuitionStore } from 'stores/useIntuitionStore';
import { useScreenStore } from 'stores/useScreenStore';

export const resetScreenTitleBarButtonEvents = () => {
  const { screens } = useScreenStore.getState();
  screens.map((screen: IScreen) => {
    screen.titleBar?.buttons.map((button) => {
      button.currentImageIndex = 0;
    });
  });
};

export const handleScreenTitleBarButtonEvents = (
  event: OSEvent,
  screen: IScreen,
  button: IButton
) => {
  eventLog(event, 'Screen Titlebar button');

  const { selectedButtonId, setSelectedButtonId } =
    useIntuitionStore.getState();

  console.log(selectedButtonId);

  const mouseDown = () => {
    if (event.button === EnumMouseButton.Left) {
      switch (button.name) {
        case EnumButtonFunction.order:
          button.currentImageIndex = 1;
          break;
        case EnumButtonFunction.maximize:
          button.currentImageIndex = 1;
          break;
      }
      setSelectedButtonId(button.id);
      setScreen(screen);
    }
  };

  const mouseUp = () => {
    if (selectedButtonId === button.id) {
      switch (button.name) {
        case EnumButtonFunction.order:
          if (screen.zIndex === getLowestScreenZIndex()) {
            screenBringToFront(screen);
          } else {
            screenSendToBack(screen);
          }

          break;
        case EnumButtonFunction.maximize:
          if (selectedButtonId === button.id) {
            screen.position.y = 0;
            setScreen(screen);
          }
          break;
      }
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
