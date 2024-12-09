import { ITask } from 'stores/useTaskStore';
import { JAM_WINDOW } from './window';
import { JAM_SCREEN } from './screen';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { plot } from 'functions/graphics/draw';
import { textOut } from 'functions/graphics/text';
import { IPixelArray } from 'functions/graphics/IGraphics';
import { getPixelArrayDimensions } from 'functions/graphics/pixelArray';

export class JAM_GRAPHICS {
  /****************************************************/

  public jam_screen = new JAM_SCREEN();
  public jam_window = new JAM_WINDOW();

  public screens: IScreen[] = [];
  public setScreens: (screens: IScreen[]) => void;

  constructor() {
    const { screens, setScreens } = useScreenStore.getState();
    this.screens = screens;
    this.setScreens = setScreens;
  }

  /****************************************************/

  textOut = async (
    task: ITask | null,
    props: {
      screenId: string;
      windowId: string;
      x: number;
      y: number;
      text: string;
    }
  ) => {
    const { screenId, windowId, x, y, text } = props;
    const { screenIndex, windowIndex } =
      await this.jam_window.getScreenWindowPointers(null, {
        screenId,
        windowId,
      });
    const window = this.screens[screenIndex].windows[windowIndex];
    textOut(window.client.pixels, x, y, text, 1, 2, 'Amiga Forever', 8);
  };

  /****************************************************/

  drawImage = async (
    task = null,
    props: {
      screenId: string;
      windowId: string;
      image: IPixelArray;
      x: number;
      y: number;
    }
  ) => {
    const { screenId, windowId, image, x, y } = props;
    const { screenIndex, windowIndex } =
      await this.jam_window.getScreenWindowPointers(null, {
        screenId,
        windowId,
      });
    const window = this.screens[screenIndex].windows[windowIndex];
    const { width, height } = getPixelArrayDimensions(image);
    console.log('drawImage', width, height);
    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        plot(window.client.pixels, x + px, y + py, image[py][px]);
      }
    }
  };

  /****************************************************/
}
