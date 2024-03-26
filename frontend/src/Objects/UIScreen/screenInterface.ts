import { IWindow } from 'Objects/UIWindow/windowInterface';
import { IButton } from 'interface/intuition';

export interface IScreen {
  screenId: string;
  parentTaskId: string;
  position: IScreenPosition;
  mode: IScreenMode;
  width: number;
  height: number;
  offset: {
    x: number;
    y: number;
  };
  titleBar: IScreentitleBar | null;
  numberOfColours: number;
  palette: number[][];
  ctx: CanvasRenderingContext2D | null;
  pixels: number[][];
  margin: number;
  zIndex: number;
  aspect: {
    width: number;
    height: number;
    margin: number;
  };
  client: IScreenClient;
  windows: IWindow[];
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

export interface IScreentitleBar {
  title: string;
  height: number;
  font: {
    name: string;
    size: number;
  };
  buttons: IButton[];
  pixels: number[][];
}

export interface IScreenClient {
  pixels: number[][];
}

export interface IScreenAspect {
  width: number;
  height: number;
  margin: number;
}
