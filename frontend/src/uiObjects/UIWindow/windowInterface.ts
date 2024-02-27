import { EnumMouseButton } from 'functions/mouse';
import { IButton } from 'interface/intuition';

export interface IWindowEvent {
  x: number;
  y: number;
  button: EnumMouseButton;
  type: any;
}

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
