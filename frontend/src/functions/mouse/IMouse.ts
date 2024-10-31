export interface IClientMouse {
  x: number;
  y: number;
}

export interface IMouse {
  position: {
    x: number;
    y: number;
  };
  button: EnumMouseButton;
}

export interface IWindowMouse {
  x: number;
  y: number;
  button: EnumMouseButton;
}

export enum EnumMouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}
