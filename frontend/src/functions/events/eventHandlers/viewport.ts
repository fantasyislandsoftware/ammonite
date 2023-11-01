import { ENV } from 'constants/env';
import { EnumOSEventType, OSEvent } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';
import { eventLog } from '../debug';
import { resetScreenTitleBarIconEvents } from './screen/titleBar/icon';

export const handleViewportEvents = (event: OSEvent) => {
  eventLog(event, 'Viewport');

  const { setSelectedScreen } = useScreenStore.getState();

  const mouseLeave = () => {
    setSelectedScreen(undefined);
    resetScreenTitleBarIconEvents();
  };

  switch (event.type) {
    case EnumOSEventType.MouseLeave:
      mouseLeave();
      break;
  }
};
