import { EnumMouseButton } from 'functions/mouse';

export interface IWindowEvent {
  x: number;
  y: number;
  button: EnumMouseButton;
  type: any;
}

export interface IWindow {
  windowId: string;
  parentTaskId: string;
  parentScreenId: string;
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
}
