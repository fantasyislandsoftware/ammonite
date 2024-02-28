import { ENV } from 'constants/env';
import { EnumOSEventType, OSEvent } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';
import { eventLog } from '../debug';
import { resetScreentitleBarButtonEvents } from './screen/titleBar/button';

export const handleViewportEvents = (event: OSEvent) => {
  eventLog(event, 'Viewport');

  const { setSelectedScreen } = useScreenStore.getState();

  const mouseLeave = () => {
    setSelectedScreen(undefined);
    resetScreentitleBarButtonEvents();
  };

  switch (event.type) {
    case EnumOSEventType.MouseLeave:
      mouseLeave();
      break;
  }
};
