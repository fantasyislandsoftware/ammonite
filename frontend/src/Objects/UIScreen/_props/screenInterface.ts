import { IWindow } from 'Objects/UIWindow/_props/windowInterface';
import { IButton } from 'Objects/UIButton/props/buttonInterface';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { IPixelArray } from 'functions/graphics/IGraphics';

export interface IScreen {
  screenId: string;
  parentTaskId: string;
  object: EnumUIObjectType;
  position: IScreenPosition;
  mode: IScreenMode;
  width: number;
  height: number;
  offset: {
    x: number;
    y: number;
  };
  titleBar: IScreenTitleBar | null;
  numberOfColours: number;
  palette: IPixelArray;
  ctx: CanvasRenderingContext2D | null;
  pixels: IPixelArray;
  margin: number;
  zIndex: number;
  aspect: {
    width: number;
    height: number;
    margin: number;
  };
  client: IScreenClient;
  windows: IWindow[];
  selectedWindowId: string | undefined;
}

export interface IScreenPosition {
  y: number;
  z: number;
}

export enum EnumScreenModeType {
  CLASSIC = 'classic',
  CLIENT = 'client',
}
export interface IScreenMode {
  type: EnumScreenModeType;
  viewPort: {
    width: number;
    height: number;
  };
  verticalStretchRatio: number;
  bitDepth: 12 | 15 | 16 | 24 | 32;
  maxColors: 2 | 4 | 16 | 32 | 64 | 256 | 4096 | 65536 | 16777216;
}

export interface IScreenTitleBar {
  title: string;
  height: number;
  font: {
    name: string;
    size: number;
  };
  pixels: IPixelArray;
  buttons: IButton[];
}

export interface IScreenClient {
  pixels: IPixelArray;
}

export interface IScreenAspect {
  width: number;
  height: number;
  margin: number;
}
