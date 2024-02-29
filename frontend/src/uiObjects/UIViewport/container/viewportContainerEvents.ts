import { EnumOSEventType } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';

export const viewportContainerEvents = (event: Event) => {
  const { setSelectedScreen } = useScreenStore.getState();

  const mouseLeave = () => {
    setSelectedScreen(undefined);
  };

  switch (event.type) {
    case EnumOSEventType.MouseLeave:
      mouseLeave();
      break;
  }
};
