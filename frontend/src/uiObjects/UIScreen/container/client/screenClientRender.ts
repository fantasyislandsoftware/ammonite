import { IScreen } from 'interface/screen';
import { IScreenContainerCalc } from '../screenContainerCalc';
import { createPixelBuffer } from 'functions/graphics';
import { ScreenColour } from 'constants/colours';

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
