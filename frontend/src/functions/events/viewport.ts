import { EnumOSEventObjectType, IOSEvent } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';

const mouseExit = (osEvent: IOSEvent) => {
  const { eventType } = osEvent;
  const { setSelectedScreen } = useScreenStore.getState();
  if (eventType === 'mouseexit') {
    setSelectedScreen(undefined);
  }
};

export const viewportEventHandler = (osEvent: IOSEvent) => {
  const { object } = osEvent;
  if (object.type === EnumOSEventObjectType.Viewport) {
    mouseExit(osEvent);
  }
};
