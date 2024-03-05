import { EnumOSEventType, IBaseEvent } from 'src/interface/event';
import { useScreenStore } from 'src/stores/useScreenStore';

export const viewportContainerEvents = (event: IBaseEvent) => {
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
