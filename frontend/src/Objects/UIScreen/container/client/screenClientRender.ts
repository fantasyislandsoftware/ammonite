import { IScreenContainerCalc } from '../screenContainerCalc';
import { createPixelBuffer } from 'functions/graphics';
import { ScreenColour } from 'constants/colours';
import { IScreen } from 'Objects/UIScreen/screenInterface';

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
