import { orderButton } from 'Objects/UIButton/buttons';
import { IScreen } from 'Objects/UIScreen/screenInterface';
import { initPixelArray, pixelMerge } from 'api/lib/graphics/pixelArray';
import {
  EnumVectorShapeType,
  VectorCanvas,
  renderVectorCanvas,
} from 'api/lib/graphics/vector';
import { ScreenColour } from 'constants/colours';

export const screenClientRender = (pixels: number[][], screen: IScreen) => {
  //const y = orderButton();
  //pixels = pixelMerge(y, pixels, 20, 20);
  return pixels;
};
