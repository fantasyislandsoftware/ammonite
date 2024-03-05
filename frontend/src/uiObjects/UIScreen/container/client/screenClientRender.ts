import { IScreenContainerCalc } from '../screenContainerCalc';
import { createPixelBuffer } from 'src/functions/graphics';
import { ScreenColour } from 'src/constants/colours';
import { IScreen } from 'src/UIObjects/UIScreen/screenInterface';

export const screenClientRender = (
  screen: IScreen,
  calc: IScreenContainerCalc | null
) => {
  if (calc === null) return null;

  const client = createPixelBuffer(
    screen.width,
    calc.client.height,
    ScreenColour.CLIENT
  );

  return client;
};
