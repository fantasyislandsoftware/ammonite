import { IScreen } from './interface';
import { generateDefaultColorPalette } from './palettes';
import { low, med } from './screenModes';

export const testScreenLoRes: IScreen = {
  id: 0,
  position: {
    y: 0,
    z: 0,
  },
  mode: low,
  width: 320,
  height: 256,
  titleBar: {
    title: 'Untitled1',
    height: 16,
    font: {
      name: 'Arial',
      size: 12,
    },
    icons: [],
  },
  numberOfColours: 16,
  palette: generateDefaultColorPalette(16),
  canvasBuffers: {
    titleBarContext: null,
    clientContext: null,
  },
};

export const testScreenMedRes: IScreen = {
  id: 1,
  position: {
    y: 0,
    z: 0,
  },
  mode: med,
  width: 640,
  height: 256,
  titleBar: {
    title: 'Untitled2',
    height: 16,
    font: {
      name: 'Arial',
      size: 12,
    },
    icons: [],
  },
  numberOfColours: 16,
  palette: generateDefaultColorPalette(16),
  canvasBuffers: {
    titleBarContext: null,
    clientContext: null,
  },
};

export const testScreenFull: IScreen = {
  id: 2,
  position: {
    y: 100,
    z: 0,
  },
  mode: low,
  width: 320,
  height: 256,
  titleBar: {
    title: 'Untitled3',
    height: 16,
    font: {
      name: 'Arial',
      size: 12,
    },
    icons: [],
  },
  numberOfColours: 16,
  palette: generateDefaultColorPalette(16),
  canvasBuffers: {
    titleBarContext: null,
    clientContext: null,
  },
};
