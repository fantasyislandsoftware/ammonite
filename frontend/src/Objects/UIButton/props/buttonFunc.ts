import { useScreenStore } from 'stores/useScreenStore';
import { EnumButtonState, IButton, IButtonDef } from './buttonInterface';
import { v4 as uuidv4 } from 'uuid';
import { STATE } from 'constants/global';

export const setButtonDown = (buttonId: string) => {
  const { screens } = useScreenStore.getState();
  STATE.buttonDownId = buttonId;
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

export const generateBarIcons = (
  buttonDefs: IButtonDef[],
  buttonSize: number,
  barWidth: number
) => {
  const buttons: IButton[] = [];
  buttonDefs.map((buttonDef, index) => {
    buttons.push({
      id: uuidv4(),
      type: buttonDef.type,
      state: EnumButtonState.UP,
      x: barWidth - index * buttonSize - buttonSize,
      y: 0,
      w: buttonSize,
      h: buttonSize,
      func: buttonDef.func,
    });
  });
  return buttons;
};
