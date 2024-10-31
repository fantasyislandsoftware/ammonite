import { resetAllButtons } from 'Objects/UIButton/props/buttonFunc';
import { EnumOSEventType, IBaseEvent } from 'functions/events/IEvents';
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
