import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { IWindow } from 'Objects/UIWindow/_props/windowInterface';

export interface IButton {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: EnumButtonType;
  func: any;
  state: EnumButtonState;
}

export enum EnumButtonType {
  CLOSE = 'close',
  ORDER = 'order',
  MAXIMIZE = 'maximize',
}

export enum EnumButtonState {
  DOWN = 'down',
  UP = 'up',
}

export type IButtonFunction = (screen: IScreen, window: IWindow) => void;

export interface IButtonDef {
  type: EnumButtonType;
  func: any;
}
