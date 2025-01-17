import { ITask } from 'stores/useTaskStore';
import { JAM_SCREEN } from '../jam/screen';
import {
  IScreenColors,
  IScreenMode,
} from 'Objects/UIScreen/_props/screenInterface';
import { initPixelArray } from 'functions/graphics/pixelArray';

export class BB_GRAPHICS {
  /****************************************************/

  Plot = async (
    task: ITask,
    props: { x: number; y: number; colorIndex: number }
  ) => {};

  /****************************************************/
}
