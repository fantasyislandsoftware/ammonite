import { IButton } from './intuition';

export interface IWindow {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  titleBar: IWindowTitleBar;
  borderThickness: number;
}

export interface IWindowTitleBar {
  title: string;
  height: number;
  font: {
    name: string;
    size: number;
  };
  buttons: IButton[];
}
