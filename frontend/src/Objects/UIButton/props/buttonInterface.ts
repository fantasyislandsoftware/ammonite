export interface IButton {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  func: EnumButtonFunc;
  state: EnumButtonState;
}

export enum EnumButtonFunc {
  ORDER = 'order',
  MAXIMIZE = 'maximize',
}

export enum EnumButtonState {
  DOWN = 'down',
  UP = 'up',
}
