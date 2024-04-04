import { resetAllButtons } from 'Objects/UIButton/buttonContainerFunc';
import { EnumOSEventType, IBaseEvent } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';

export const viewportContainerEvents = (event: IBaseEvent) => {
  const { setSelectedScreen } = useScreenStore.getState();

  const mouseLeave = () => {
    setSelectedScreen(undefined);
    resetAllButtons();
  };

  switch (event.type) {
    case EnumOSEventType.MouseLeave:
      mouseLeave();
      break;
  }
};
