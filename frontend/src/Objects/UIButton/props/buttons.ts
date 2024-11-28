import { initPixelArray } from 'functions/graphics/pixelArray';
import {
  EnumVectorShapeType,
  VectorCanvas,
  renderVectorCanvas,
} from 'functions/graphics/vector';
import { EnumButtonState } from './buttonInterface';
import { ButtonColour } from './buttonColour';

export const makeCloseButton = (state: EnumButtonState) => {
  return [
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 10,
        py1: 10,
        px2: 90,
        py2: 90,
        colorIndex:
          state === EnumButtonState.UP
            ? ButtonColour.PRIMARY
            : ButtonColour.SECONDARY,
      },
    },
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 20,
        py1: 20,
        px2: 80,
        py2: 80,
        colorIndex:
          state === EnumButtonState.DOWN
            ? ButtonColour.PRIMARY
            : ButtonColour.SECONDARY,
      },
    },
  ];
};

export const makeOrderButton = (state: EnumButtonState) => {
  return [
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
  ];
};

export const makeMaximizeButton = (state: EnumButtonState) => {
  return [
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
  ];
};

export const makeDefaultButton = (state: EnumButtonState) => {
  return [
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 10,
        py1: 10,
        px2: 90,
        py2: 90,
        colorIndex:
          state === EnumButtonState.UP
            ? ButtonColour.PRIMARY
            : ButtonColour.SECONDARY,
      },
    },
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 20,
        py1: 20,
        px2: 80,
        py2: 80,
        colorIndex:
          state === EnumButtonState.DOWN
            ? ButtonColour.PRIMARY
            : ButtonColour.SECONDARY,
      },
    },
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 40,
        py1: 40,
        px2: 80,
        py2: 80,
        colorIndex:
          state === EnumButtonState.UP
            ? ButtonColour.PRIMARY
            : ButtonColour.SECONDARY,
      },
    },
  ];
};

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
