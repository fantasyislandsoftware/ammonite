import { useScreenStore } from 'stores/useScreenStore';
import { EnumButtonState, IButton } from './buttonInterface';
import {
  screenContainerBringToFront,
  screenContainerSendToBack,
  screenContainerSetYToTop,
} from 'Objects/UIScreen/container/screenContainerFunc';
import { IScreen } from 'Objects/UIScreen/screenInterface';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';

export const setButtonDown = (buttonId: string) => {
  const { screens } = useScreenStore.getState();
  screens.map((screen) => {
    screen.titleBar?.buttons.map((button) => {
      if (button.id === buttonId) {
        button.state = EnumButtonState.DOWN;
      }
    });
  });
};

export const resetAllButtons = () => {
  const { screens } = useScreenStore.getState();
  screens.map((screen) => {
    screen.titleBar?.buttons.map((button) => {
      button.state = EnumButtonState.UP;
    });
  });
};

export const execButtonFunction = (target: IScreen, button: IButton) => {
  switch (target.object) {
    /* Screen */
    case EnumUIObjectType.SCREEN:
      switch (button.func) {
        case 'maximize':
          screenContainerSetYToTop(target);
          break;
        case 'order':
          screenContainerSendToBack(target);
          screenContainerRender(target);
          break;
        default:
          break;
      }
      break;
    /* */
    default:
  }
};
