import { IScreen } from './interface';
import { low } from './screenModes';

export const defaultScreen: IScreen = {
  id: 0,
  position: {
    y: 0,
    z: 0,
  },
  mode: low,
  titleBar: null,
  numberOfColours: 16,
  palette: [],
  canvasBuffers: {
    titleBarContext: null,
    clientContext: null,
  },
};
