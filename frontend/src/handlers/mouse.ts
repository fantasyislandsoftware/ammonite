import { IScreen } from '../interface/screen';

export interface IClientMouse {
  x: number;
  y: number;
}

export interface IScreenMouse {
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

export const getClientMouse = (e: any): IClientMouse => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

export const getScreenMouse = (e: any, screen: IScreen): IScreenMouse => {
  const clientX = e.clientX;
  const clientY = e.clientY;
  return {
    screen: {
      x: Math.round(clientX / (e.target.clientWidth / screen.width)) - 1,
      y:
        Math.round(
          (clientY - screen.position.y) /
            (e.target.clientHeight / screen.mode.viewPort.height)
        ) - 1,
    },
    button: e.button,
  };
};
