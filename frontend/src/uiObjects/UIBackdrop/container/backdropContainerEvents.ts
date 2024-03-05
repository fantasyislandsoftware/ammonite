import { screenContainerDrag } from '../../../UIObjects/UIScreen/container/screenContainerFunc';
import { IClientMouse } from 'src/functions/mouse';
import { EnumOSEventType, IBaseEvent } from 'src/interface/event';
import { useScreenStore } from 'src/stores/useScreenStore';

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
