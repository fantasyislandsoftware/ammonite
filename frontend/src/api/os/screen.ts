import { initPixelArray } from 'handlers/screen';
import { IScreen, IScreenMode, IScreenTitleBar } from 'interface/screen';
import { useScreenStore } from 'stores/useScreenStore';
import { generateDefaultColorPalette } from 'uiObjects/Screen/palettes';

export const openScreen = (
  width: number,
  height: number,
  mode: IScreenMode,
  title: string | null
) => {
  const { screens, setScreens, nextAvailableScreenId, incAvailableScreenId } =
    useScreenStore.getState();

  const titleBar = title
    ? {
        title: title,
        height: 0,
        font: {
          name: 'Arial',
          size: 12,
        },
        icons: [],
      }
    : null;

  const newScreen: IScreen = {
    id: nextAvailableScreenId,
    position: {
      y: 0,
      z: 0,
    },
    mode: mode,
    width: width,
    height: height,
    titleBar: titleBar,
    numberOfColours: 16,
    palette: generateDefaultColorPalette(16),
    ctx: null,
    pixels: initPixelArray(width, height),
    margin: 0,
  };
  screens.push(newScreen);
  setScreens(screens);
};
