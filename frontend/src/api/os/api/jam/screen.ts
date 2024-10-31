import { IScreen, IScreenMode } from 'Objects/UIScreen/_props/screenInterface';
import { useScreenStore } from 'stores/useScreenStore';
import { ITask } from 'stores/useTaskStore';
import { low } from 'Objects/UIScreen/_props/screenModes';
import {
  getHighestScreenZIndex,
  setScreen,
} from 'Objects/UIScreen/_props/screenFunctions';
import { measureText } from 'api/lib/graphics/text';
import { screenDefault } from 'Objects/UIScreen/_props/screenDefault';
import { v4 as uuidv4 } from 'uuid';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { EnumUIObjectType } from 'Objects/UIObject/objectInterface';
import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { ScreenColour } from 'Objects/UIScreen/_props/screenColour';
import { generateDefaultColorPalette } from 'Objects/UIScreen/_props/palettes';
import { STATE } from 'constants/globals/state';

export class JAM_SCREEN {
  private self: ITask;
  public low: IScreenMode = low;
  public screens: IScreen[] = [];
  public setScreens: (screens: IScreen[]) => void;
  constructor(self: ITask) {
    this.self = self;
    const { screens, setScreens } = useScreenStore.getState();
    this.screens = screens;
    this.setScreens = setScreens;
  }
  /* */
  openScreen = async (
    parentTaskId: string,
    width: number,
    height: number,
    mode: IScreenMode,
    title: string | null,
    returnId: string
  ) => {
    const { screens, setScreens } = useScreenStore.getState();

    const nextScreenIndex = screens.length ? getHighestScreenZIndex() + 1 : 100;

    let { height: titleBarHeight } = measureText(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=',
      screenDefault.titleBar.font.name,
      screenDefault.titleBar.font.size
    );

    titleBarHeight += 1;

    const screenId = uuidv4();

    /* Buttons */
    const buttonSize = Math.round(titleBarHeight / 2) * 2 - 2;
    const buttons = generateBarIcons(
      [
        {
          type: EnumButtonType.ORDER,
          func: `screenAPI.reorderScreen('${screenId}')`,
        },
        {
          type: EnumButtonType.MAXIMIZE,
          func: `screenAPI.maximizeScreen('${screenId}')`,
        },
      ],
      buttonSize,
      width
    );

    const data: IScreen = {
      screenId: screenId,
      parentTaskId: parentTaskId,
      object: EnumUIObjectType.SCREEN,
      position: {
        y: 0,
        z: 0,
      },
      mode: mode,
      width: width,
      height: height,
      offset: {
        x: 0,
        y: 0,
      },
      titleBar: title
        ? {
            title: title,
            height: titleBarHeight,
            font: screenDefault.titleBar.font,
            buttons: buttons,
            pixels: initPixelArray(
              width,
              titleBarHeight,
              ScreenColour.TITLEBAR_BACKGROUND
            ),
          }
        : null,
      numberOfColours: 16,
      palette: generateDefaultColorPalette(16),
      ctx: null,
      pixels: initPixelArray(width, height, ScreenColour.BORDER),
      margin: 0,
      zIndex: nextScreenIndex,
      aspect: {
        width: 0,
        height: 0,
        margin: 0,
      },
      client: {
        pixels: initPixelArray(
          width,
          height - titleBarHeight,
          ScreenColour.CLIENT
        ),
      },
      windows: [],
      selectedWindowId: undefined,
    };
    screens.push(data);

    setScreens(screens);
    setTimeout(() => {
      setScreen(data);
    });

    STATE.currentScreenId = screenId;

    this.self.var[returnId] = screenId;
  };
  /* */
  setTitle = async (screenId: string, title: string) => {
    const screenIndex = this.findScreenIndex(screenId);
    this.screens[screenIndex].titleBar!.title = title;
    setScreen(this.screens[screenIndex]);
  };
  /* */
  findScreenIndex = (id: string) => {
    const { screens } = useScreenStore.getState();
    return screens.findIndex((s) => s.screenId === id);
  };
}
