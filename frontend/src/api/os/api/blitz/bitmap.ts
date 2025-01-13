import { ITask } from 'stores/useTaskStore';
import { JAM_SCREEN } from '../jam/screen';
import {
  IScreenColors,
  IScreenMode,
} from 'Objects/UIScreen/_props/screenInterface';
import { initPixelArray } from 'functions/graphics/pixelArray';

export class BB_BITMAP {
  /****************************************************/

  BitMap = async (
    task: ITask,
    props: {
      id: number;
      width: number;
      height: number;
      depth: IScreenColors;
    }
  ) => {
    task.bitmap.current = props.id;
    task.bitmap.data[props.id] = initPixelArray(
      props.width,
      props.height,
      props.depth
    );
  };

  /****************************************************/
}
