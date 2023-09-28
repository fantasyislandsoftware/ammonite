import { IScreen } from '../components/Screen/interface';

export interface IMouse {
  client: {
    x: number;
    y: number;
  };
  screen: {
    x: number;
    y: number;
  };
  button: EnumMouseButton;
}

export enum EnumMouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}

export const getMouse = (e: any, screen: IScreen): IMouse => {
  const clientX = e.clientX;
  const clientY = e.clientY;
  return {
    client: {
      x: clientX,
      y: clientY,
    },
    screen: {
      x: Math.round(clientX / (e.target.clientWidth / screen.width)) - 1,
      y:
        Math.round(
          (clientY - screen.position.y) /
            (e.target.clientHeight / screen.height)
        ) - 1,
    },
    button: e.button,
  };
};
