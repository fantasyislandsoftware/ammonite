import { IScreen } from './interface';
import { generateDefaultColorPalette } from './palettes';
import { low } from './screenModes';

export const backdropScreen: IScreen = {
  id: 0,
  position: {
    y: 0,
    z: 0,
  },
  mode: low,
  width: 320,
  height: 256,
  titleBar: null,
  numberOfColours: 16,
  palette: generateDefaultColorPalette(16),
  canvasBuffers: {
    titleBarContext: null,
    clientContext: null,
  },
};

export const defaultScreen: IScreen = {
  id: 1,
  position: {
    y: 0,
    z: 0,
  },
  mode: low,
  width: 320,
  height: 256,
  titleBar: {
    title: 'Untitled',
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
