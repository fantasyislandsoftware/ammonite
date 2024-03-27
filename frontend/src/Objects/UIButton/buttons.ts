import { initPixelArray } from 'api/lib/graphics/pixelArray';
import {
  EnumVectorShapeType,
  VectorCanvas,
  renderVectorCanvas,
} from 'api/lib/graphics/vector';
import { ScreenColour } from 'constants/colours';

export const orderButton = (w: number, h: number) => {
  const data: VectorCanvas = {
    pixels: initPixelArray(w, h, ScreenColour.BORDER),
    bgColorIndex: 0,
    shapes: [
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 10,
          py1: 10,
          px2: 70,
          py2: 70,
          colorIndex: ScreenColour.CLIENT,
        },
      },
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 30,
          py1: 30,
          px2: 90,
          py2: 90,
          colorIndex: ScreenColour.TITLEBAR_BACKGROUND,
        },
      },
    ],
  };
  return renderVectorCanvas(data);
};

export const maximizeButton = (w: number, h: number) => {
  const data: VectorCanvas = {
    pixels: initPixelArray(w, h, ScreenColour.BORDER),
    bgColorIndex: 0,
    shapes: [
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 10,
          py1: 10,
          px2: 90,
          py2: 20,
          colorIndex: ScreenColour.TITLEBAR_BACKGROUND,
        },
      },
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 10,
          py1: 20,
          px2: 90,
          py2: 90,
          colorIndex: ScreenColour.CLIENT,
        },
      },
    ],
  };
  return renderVectorCanvas(data);
};
