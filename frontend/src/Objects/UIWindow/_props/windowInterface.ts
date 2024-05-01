import { IButton } from 'Objects/UIButton/props/buttonInterface';
import { EnumMouseButton } from 'functions/mouse';
import { IPixelArray } from 'interface/graphics';

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
  titleBar: IWindowTitleBar;
  border: IWindowBorder;
  pixels: IPixelArray;
}

export interface IWindowBorder {
  thickness: number;
  color: number;
}

export interface IWindowTitleBar {
  title: string;
  offset: number;
  width: number;
  height: number;
  font: {
    name: string;
    size: number;
  };
  pixels: IPixelArray;
  color: {
    background: number;
    text: number;
  };
  buttons: IButton[];
}
