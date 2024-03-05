import { IClientMouse, IScreenMouse } from 'src/functions/mouse';
import { EnumOSEventType } from 'src/interface/event';
import { screenContainerDrag } from '../screenContainerFunc';
import { IScreen } from '../../../../UIObjects/UIScreen/screenInterface';

export const screenClientEvents = (
  event: any,
  screenMouse: IScreenMouse,
  clientMouse: IClientMouse,
  screen: IScreen
) => {
  const mouseMove = () => {
    screenContainerDrag(clientMouse);
  };

  switch (event.type) {
    case EnumOSEventType.MouseMove:
      mouseMove();
      break;
  }
};
