export type IPixelArray = number[][];

export type IPixelBuffer = {
  width: number;
  height: number;
  pixels: IPixelArray;
};

export interface IBrush {
  width: number;
  height: number;
  pixels: IPixelArray;
}

export interface ICanvasTextInfo {
  width: number;
  height: number;
  top: number;
}
