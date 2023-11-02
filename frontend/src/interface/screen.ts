import { IButton } from './intuition';

export interface IScreen {
  id: number;
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
  buttons: IButton[];
}

export interface IScreenAspect {
  width: number;
  height: number;
  margin: number;
}
