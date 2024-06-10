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
    z: number;
  };
  titleBar: IWindowTitleBar | null;
  border: IWindowBorder;
  pixels: IPixelArray;
  client: IWindowClient;
}

export interface IWindowBorder {
  thickness: number;
  color: number;
}

export interface IWindowTitleBar {
  x: number;
  y: number;
  title: string;
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

export interface IWindowClient {
  x: number;
  y: number;
  pixels: IPixelArray;
}
