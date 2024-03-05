import { IClientMouse, IScreenMouse } from 'functions/mouse';
import { EnumOSEventType } from 'interface/event';
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
