import { ENV } from 'constants/env';
import { IClientMouse } from 'functions/mouse';
import { screenIdToIndex, setScreen } from 'functions/screen';
import { EnumOSEventType, OSEvent } from 'interface/event';
import { set } from 'lodash';
import { useScreenStore } from 'stores/useScreenStore';
import { eventLog } from '../debug';

export const handleBackdropEvents = (
  event: OSEvent,
  clientMouse: IClientMouse
) => {
  eventLog(event, 'Backdrop');

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
