import { drawFillRect, plot } from './draw';

export interface VectorRect {
  px1: number;
  py1: number;
  px2: number;
  py2: number;
  colorIndex: number;
}

export enum EnumVectorShapeType {
  RECT = 'rect',
}

export type VectorShape = {
  type: EnumVectorShapeType;
  data: VectorRect;
};

export interface VectorCanvas {
  pixels: number[][];
  bgColorIndex: number;
  shapes: VectorShape[];
}

export const renderVectorCanvas = (canvas: VectorCanvas) => {
  const width = canvas.pixels[0].length;
  const height = canvas.pixels.length;
  canvas.shapes.forEach((shape) => {
    switch (shape.type) {
      case EnumVectorShapeType.RECT:
        const x1 = Math.round((shape.data.px1 * width) / 100);
        const y1 = Math.round((shape.data.py1 * height) / 100);
        const x2 = Math.round((shape.data.px2 * width) / 100);
        const y2 = Math.round((shape.data.py2 * height) / 100);
        drawFillRect(canvas.pixels, x1, y1, x2, y2, shape.data.colorIndex);
        break;
    }
  });

  return canvas.pixels;
};
