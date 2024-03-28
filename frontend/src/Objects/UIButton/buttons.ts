import { initPixelArray } from 'api/lib/graphics/pixelArray';
import {
  EnumVectorShapeType,
  VectorCanvas,
  renderVectorCanvas,
} from 'api/lib/graphics/vector';
import { ButtonColour, ScreenColour } from 'constants/colours';
import { Button } from 'semantic-ui-react';
import { EnumButtonState } from './buttonInterface';

export const orderButton = (
  w: number,
  h: number,
  bgColorIndex: number,
  state: EnumButtonState
) => {
  const data: VectorCanvas = {
    pixels: initPixelArray(w, h, bgColorIndex),
    bgColorIndex: 0,
    shapes: [
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 10,
          py1: 10,
          px2: 70,
          py2: 70,
          colorIndex:
            state === EnumButtonState.UP
              ? ButtonColour.PRIMARY
              : ButtonColour.SECONDARY,
        },
      },
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 30,
          py1: 30,
          px2: 90,
          py2: 90,
          colorIndex:
            state === EnumButtonState.UP
              ? ButtonColour.SECONDARY
              : ButtonColour.PRIMARY,
        },
      },
    ],
  };
  return renderVectorCanvas(data);
};

export const maximizeButton = (
  w: number,
  h: number,
  bgColorIndex: number,
  state: EnumButtonState
) => {
  const data: VectorCanvas = {
    pixels: initPixelArray(w, h, bgColorIndex),
    bgColorIndex: 0,
    shapes: [
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 10,
          py1: 10,
          px2: 90,
          py2: 20,
          colorIndex:
            state === EnumButtonState.UP
              ? ButtonColour.PRIMARY
              : ButtonColour.SECONDARY,
        },
      },
      {
        type: EnumVectorShapeType.RECT,
        data: {
          px1: 10,
          py1: 20,
          px2: 90,
          py2: 90,
          colorIndex:
            state === EnumButtonState.UP
              ? ButtonColour.SECONDARY
              : ButtonColour.PRIMARY,
        },
      },
    ],
  };
  return renderVectorCanvas(data);
};
