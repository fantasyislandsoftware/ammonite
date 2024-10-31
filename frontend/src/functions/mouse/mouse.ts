import {
  EnumScreenModeType,
  IScreen,
} from '../../Objects/UIScreen/_props/screenInterface';
import { IClientMouse, IMouse } from './IMouse';

export const getClientMouse = (e: any): IClientMouse => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

export const getScreenMouse = (
  e: any,
  screen: IScreen
  //aspect: IScreenAspect
): IMouse => {
  //const m = aspect ? aspect.margin : 0;
  const m = screen.aspect.margin;
  const clientX = e.clientX - Math.round(m / 2);
  const clientY = e.clientY;

  let x = 0;
  let y = 0;
  if (screen.mode.type === EnumScreenModeType.CLIENT) {
    x = clientX;
    y = clientY - screen.position.y;
  } else {
    x =
      Math.floor(
        clientX / (e.target.clientWidth / screen.mode.viewPort.width)
      ) - screen.offset.x;
    if (x < 0) x = 0;
    y =
      Math.floor(
        (clientY - screen.position.y) /
          (e.target.clientHeight / screen.mode.viewPort.height)
      ) - screen.offset.y;
    if (y < 0) y = 0;
  }

  return {
    position: {
      x: x,
      y: y,
    },
    button: e.button,
  };
};

export const inBoundary = (
  screenMouse: IMouse,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return (
    screenMouse.position.x > x1 - 1 &&
    screenMouse.position.x < x2 &&
    screenMouse.position.y > y1 - 1 &&
    screenMouse.position.y < y2
  );
};
