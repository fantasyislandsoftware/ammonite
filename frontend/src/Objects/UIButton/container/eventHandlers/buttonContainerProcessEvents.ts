import { EnumOSEventType, IEvent } from 'interface/event';

export const buttonContainerProcessEvents = (event: IEvent) => {
  const mouseDown = () => {
    console.log(event.button);
  };

  const mouseUp = () => {
    //console.log('mouse up');
  };

  switch (event.event.type) {
    case EnumOSEventType.MouseDown:
      mouseDown();
      break;
    case EnumOSEventType.MouseUp:
      mouseUp();
      break;
    default:
      break;
  }
};
