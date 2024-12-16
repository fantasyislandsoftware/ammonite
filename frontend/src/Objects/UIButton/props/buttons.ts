import { initPixelArray } from 'functions/graphics/pixelArray';
import {
  EnumVectorShapeType,
  VectorCanvas,
  renderVectorCanvas,
} from 'functions/graphics/vector';
import { EnumButtonState } from './buttonInterface';
import { ButtonColour } from './buttonColour';
import { checkPaletteIndex } from 'functions/colour/colour';

export const makeCloseButton = (
  state: EnumButtonState,
  palette: number[][]
) => {
  const primary = checkPaletteIndex(ButtonColour.PRIMARY, palette);
  const secondary = checkPaletteIndex(ButtonColour.SECONDARY, palette);
  return [
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 10,
        py1: 10,
        px2: 90,
        py2: 90,
        colorIndex: state === EnumButtonState.UP ? primary : secondary,
      },
    },
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 20,
        py1: 20,
        px2: 80,
        py2: 80,
        colorIndex: state === EnumButtonState.DOWN ? primary : secondary,
      },
    },
  ];
};

export const makeOrderButton = (
  state: EnumButtonState,
  palette: number[][]
) => {
  const primary = checkPaletteIndex(ButtonColour.PRIMARY, palette);
  const secondary = checkPaletteIndex(ButtonColour.SECONDARY, palette);
  return [
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 10,
        py1: 10,
        px2: 70,
        py2: 70,
        colorIndex: state === EnumButtonState.UP ? primary : secondary,
      },
    },
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 30,
        py1: 30,
        px2: 90,
        py2: 90,
        colorIndex: state === EnumButtonState.UP ? secondary : primary,
      },
    },
  ];
};

export const makeMaximizeButton = (
  state: EnumButtonState,
  palette: number[][]
) => {
  const primary = checkPaletteIndex(ButtonColour.PRIMARY, palette);
  const secondary = checkPaletteIndex(ButtonColour.SECONDARY, palette);
  return [
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 10,
        py1: 10,
        px2: 90,
        py2: 20,
        colorIndex: state === EnumButtonState.UP ? primary : secondary,
      },
    },
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 10,
        py1: 20,
        px2: 90,
        py2: 90,
        colorIndex: state === EnumButtonState.UP ? secondary : primary,
      },
    },
  ];
};

export const makeDefaultButton = (
  state: EnumButtonState,
  palette: number[][]
) => {
  const primary = checkPaletteIndex(ButtonColour.PRIMARY, palette);
  const secondary = checkPaletteIndex(ButtonColour.SECONDARY, palette);
  return [
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 10,
        py1: 10,
        px2: 90,
        py2: 90,
        colorIndex: state === EnumButtonState.UP ? primary : secondary,
      },
    },
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 20,
        py1: 20,
        px2: 80,
        py2: 80,
        colorIndex: state === EnumButtonState.DOWN ? primary : secondary,
      },
    },
    {
      type: EnumVectorShapeType.RECT,
      data: {
        px1: 40,
        py1: 40,
        px2: 80,
        py2: 80,
        colorIndex: state === EnumButtonState.UP ? primary : secondary,
      },
    },
  ];
};

export const orderButton = (
  palette: number[][],
  w: number,
  h: number,
  bgColorIndex: number,
  state: EnumButtonState
) => {
  const buttonPrimary = checkPaletteIndex(ButtonColour.PRIMARY, palette);
  const buttonSecondary = checkPaletteIndex(ButtonColour.SECONDARY, palette);
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
            state === EnumButtonState.UP ? buttonPrimary : buttonSecondary,
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
            state === EnumButtonState.UP ? buttonSecondary : buttonPrimary,
        },
      },
    ],
  };
  return renderVectorCanvas(data);
};

export const maximizeButton = (
  palette: number[][],
  w: number,
  h: number,
  bgColorIndex: number,
  state: EnumButtonState
) => {
  const buttonPrimary = checkPaletteIndex(ButtonColour.PRIMARY, palette);
  const buttonSecondary = checkPaletteIndex(ButtonColour.SECONDARY, palette);
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
            state === EnumButtonState.UP ? buttonPrimary : buttonSecondary,
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
            state === EnumButtonState.UP ? buttonSecondary : buttonPrimary,
        },
      },
    ],
  };
  return renderVectorCanvas(data);
};
