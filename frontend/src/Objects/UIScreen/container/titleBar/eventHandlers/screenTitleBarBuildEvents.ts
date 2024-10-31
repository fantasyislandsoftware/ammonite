import { EnumOSEventObjectType, IBaseEvent } from 'functions/events/IEvents';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { buttonContainerBuildEvents } from 'Objects/UIButton/container/eventHandlers/buttonContainerBuildEvents';
import { addEvent } from 'functions/events/events';
import { IMouse } from 'functions/mouse/IMouse';

export const screenTitleBarBuildEvents = (
  event: IBaseEvent,
  screenMouse: IMouse,
  screen: IScreen
) => {
  addEvent(EnumOSEventObjectType.ScreenTitleBar, event, screenMouse, {
    screen: screen,
  });

  const { titleBar } = screen;
  if (!titleBar) return;
  const { buttons } = titleBar;

  /* Buttons */
  buttons.map((button) => {
    buttonContainerBuildEvents(
      event,
      { screen: screen, button: button },
      screenMouse
    );
  });
};
