import { IScreen } from './interface';
import { default16ColourPalette } from './palettes';
import { low, med, interlaced } from './screenModes';

export const lowResScreen: IScreen = {
  id: 1,
  position: {
    y: 0,
    z: 0,
  },
  mode: low,
  titleBar: {
    title: 'Low Resolution',
    height: 0,
    font: {
      name: 'Arial',
      size: 12,
    },
    icons: [],
  },
  numberOfColours: 16,
  palette: default16ColourPalette,
  canvasBuffers: {
    titleBarContext: null,
    clientContext: null,
  },
};

export const medResScreen: IScreen = {
  id: 2,
  position: {
    y: 100,
    z: 0,
  },
  mode: med,
  titleBar: {
    title: 'Medium Resolution',
    height: 0,
    font: {
      name: 'Arial',
      size: 12,
    },
    icons: [],
  },
  numberOfColours: 16,
  palette: default16ColourPalette,
  canvasBuffers: {
    titleBarContext: null,
    clientContext: null,
  },
};

export const interlacedScreen: IScreen = {
  id: 3,
  position: {
    y: 200,
    z: 0,
  },
  mode: interlaced,
  titleBar: {
    title: 'Interlaced Resolution',
    height: 0,
    font: {
      name: 'Arial',
      size: 12,
    },
    icons: [],
  },
  numberOfColours: 16,
  palette: default16ColourPalette,
  canvasBuffers: {
    titleBarContext: null,
    clientContext: null,
  },
};
