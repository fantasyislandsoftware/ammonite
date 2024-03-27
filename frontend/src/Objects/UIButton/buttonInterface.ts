export interface IButton {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: EnumButtonType;
}

export enum EnumButtonType {
  ORDER = 'order',
  MAXIMIZE = 'maximize',
}
