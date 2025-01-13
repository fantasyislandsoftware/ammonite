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
  flags: number;
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

export enum EWindowMode {
  WINDOWSIZE = 1,
  WINDOWDRAG = 2,
  WINDOWDEPTH = 4,
  WINDOWCLOSE = 8,
  SIZEBRIGHT = 10,
  SIZEBOTTOM = 20,
  BACKDROP = 100,
  GIMME000 = 400,
  BORDERLESS = 800,
  ACTIVATE = 1000,
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
