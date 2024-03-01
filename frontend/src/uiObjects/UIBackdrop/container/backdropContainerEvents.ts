import { screenContainerDrag } from 'UIObjects/UIScreen/container/screenContainerFunc';
import { IClientMouse } from 'functions/mouse';
import { EnumOSEventType, IBaseEvent } from 'interface/event';
import { useScreenStore } from 'stores/useScreenStore';

export const backdropContainerEvents = (
  event: IBaseEvent,
  clientMouse: IClientMouse
) => {
  const { selectedScreen, screens } = useScreenStore.getState();

  const mouseMove = () => {
    screenContainerDrag(clientMouse);
  };

  switch (event.type) {
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }
};
