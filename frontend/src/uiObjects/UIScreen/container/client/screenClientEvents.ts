import { IClientMouse, IScreenMouse } from 'functions/mouse';
import { setScreen } from 'functions/screen';
import { EnumOSEventType, IOSEvent } from 'interface/event';
import { IScreen } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';

export const screenClientEvents = (
  event: any,
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
) => {
  const { selectedScreen, screens } = useScreenStore.getState();

  const mouseMove = () => {
    if (!selectedScreen) return;
    const selected = screens[selectedScreen.id];
    let newPos = clientMouse.y - selectedScreen.offset.y;
    if (newPos < 0) newPos = 0;
    selected.position = { y: newPos, z: 0 };
    setScreen(selected);
  };

  switch (event.type) {
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }
};
