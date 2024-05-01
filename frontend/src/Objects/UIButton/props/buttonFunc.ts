import { useScreenStore } from 'stores/useScreenStore';
import { EnumButtonFunc, EnumButtonState, IButton } from './buttonInterface';
import {
  screenContainerSendToBack,
  screenContainerSetYToTop,
} from 'Objects/UIScreen/container/screenContainerFunc';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { v4 as uuidv4 } from 'uuid';

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
      break;
  }
};

export const generateBarIcons = (
  buttonTypes: EnumButtonFunc[],
  buttonSize: number,
  barWidth: number
) => {
  const buttons: IButton[] = [];
  buttonTypes.map((type, index) => {
    buttons.push({
      id: uuidv4(),
      func: type,
      state: EnumButtonState.UP,
      x: barWidth - index * buttonSize - buttonSize,
      y: 0,
      w: buttonSize,
      h: buttonSize,
    });
  });
  return buttons;
};
