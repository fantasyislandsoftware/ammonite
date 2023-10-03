export interface IScreen {
  id: number;
  position: IScreenPosition;
  mode: IScreenMode;
  width: number;
  height: number;
  titleBar: IScreenTitleBar | null;
  numberOfColours: number;
  palette: string[];
  canvasBuffers: {
    titleBarContext: CanvasRenderingContext2D | null;
    clientContext: CanvasRenderingContext2D | null;
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
  maxWidth: number;
  maxHeight: number;
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
  icons: IScreenTitleBarIcon[];
}

export interface IScreenTitleBarIcon {
  id: number;
}
