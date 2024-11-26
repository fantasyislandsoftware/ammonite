import { IButton } from 'Objects/UIButton/props/buttonInterface';
import { EnumMouseButton } from 'functions/events/IEvents';
import { IPixelArray } from 'functions/graphics/IGraphics';

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
  state: EWindowState;
  position: {
    x: number;
    y: number;
    z: number;
  };
  width: number;
  height: number;
  savedDimensions?: {
    width: number;
    height: number;
  };
  titleBar: IWindowTitleBar | undefined;
  border: IWindowBorder;
  pixels: IPixelArray;
  client: IWindowClient;
}

export enum EWindowState {
  DEFAULT = 'DEFAULT',
  MAXIMIZED = 'MAXIMIZED',
  MINIMIZED = 'MINIMIZED',
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
