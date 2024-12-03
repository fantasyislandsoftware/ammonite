import { ITask } from 'stores/useTaskStore';
import { JAM_WINDOW } from './window';
import { JAM_SCREEN } from './screen';
import { IScreen } from 'Objects/UIScreen/_props/screenInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { plot } from 'functions/graphics/draw';
import { textOut } from 'functions/graphics/text';

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

  drawText = async (
    task: ITask | null,
    screenId: string,
    windowId: string,
    text: string
  ) => {
    const { screenIndex, windowIndex } =
      await this.jam_window.getScreenWindowPointers(null, screenId, windowId);
    const window = this.screens[screenIndex].windows[windowIndex];
    textOut(window.client.pixels, 10, 10, text, 1, 0, 'Amiga Forever', 8);
  };

  /****************************************************/
}
