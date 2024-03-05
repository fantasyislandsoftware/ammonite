import { EnumMouseButton } from 'src/functions/mouse';
import { IButton } from 'src/interface/intuition';

export interface IWindowEvent {
  x: number;
  y: number;
  button: EnumMouseButton;
  type: any;
}

export interface IWindow {
  id: string;
  parentId: string;
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  titleBar: IWindowtitleBar;
  borderThickness: number;
}

export interface IWindowtitleBar {
  title: string;
  height: number;
  font: {
    name: string;
    size: number;
  };
  buttons: IButton[];
}
