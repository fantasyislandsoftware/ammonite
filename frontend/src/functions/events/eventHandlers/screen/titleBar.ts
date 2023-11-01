import { screenBringToFront } from 'api/os/screen';
import { eventLog } from 'functions/events/debug';
import { EnumMouseButton, IClientMouse } from 'functions/mouse';
import { screenIdToIndex, setScreen } from 'functions/screen';
import { EnumOSEventType, OSEvent } from 'interface/event';
import { IScreen } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';

export const handleScreenTitleBarEvents = (
  event: OSEvent,
  screen: IScreen,
  clientMouse: IClientMouse
) => {
  eventLog(event, 'Screen Titlebar');

  const { selectedScreen, setSelectedScreen, screens } =
    useScreenStore.getState();
  const screenIndex = screenIdToIndex(screen.id);
  if (screenIndex === undefined) return;

  const mouseDown = () => {
    if (event.button === EnumMouseButton.Left) {
      /* Select selected screen */
      setSelectedScreen({
        id: screen.id,
        offset: {
          y: clientMouse.y - screens[screenIndex].position.y,
        },
      });

      /* Set highest z-index */
      screenBringToFront(screen);
    }
  };

  const mouseUp = () => {
    setSelectedScreen(undefined);
  };

  const mouseMove = () => {
    if (!selectedScreen) return;
    const selected = screens[selectedScreen.id];
    let newPos = clientMouse.y - selectedScreen.offset.y;
    if (newPos < 0) newPos = 0;
    selected.position = { y: newPos, z: 0 };
    setScreen(selected);
  };

  const mouseDoubleClick = () => {
    screen.position.y = 0;
    setScreen(screen);
  };

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
    case EnumOSEventType.MouseDoubleClick:
      mouseDoubleClick();
      break;
  }
};
