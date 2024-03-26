import { IScreen } from 'Objects/UIScreen/screenInterface';
import { initPixelArray, pixelMerge } from 'api/lib/graphics/pixelArray';
import {
  EnumVectorShapeType,
  VectorCanvas,
  renderVectorCanvas,
} from 'api/lib/graphics/vector';
import { render } from 'react-dom';

export const screenClientRender = (pixels: number[][], screen: IScreen) => {
  const test: VectorCanvas = {
    pixels: initPixelArray(20, 20, 0),
    bgColorIndex: 0,
    shapes: [
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 10,
          py1: 10,
          px2: 90,
          py2: 90,
          colorIndex: 1,
        },
      },
    ],
  };

  const y = renderVectorCanvas(test);

  pixels = pixelMerge(y, pixels, 20, 20);

  return pixels;
};
