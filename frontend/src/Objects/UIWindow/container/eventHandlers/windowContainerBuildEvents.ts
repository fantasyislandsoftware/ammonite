import { IMouse, inBoundary } from 'functions/mouse';
import { IWindow, IWindowEvent } from '../../_props/windowInterface';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';

export const windowContainerBuildEvents = (
  event: IWindowEvent,
  window: IWindow,
  screenClientMouse: IMouse
) => {
  const { width, height, position } = window;
  const { x, y } = position;

  if (inBoundary(screenClientMouse, x, y, x + width, y + height)) {
    console.log(window.titleBar!.title);
  }
};
