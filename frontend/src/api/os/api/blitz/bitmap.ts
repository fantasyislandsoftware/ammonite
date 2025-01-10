import { ITask } from 'stores/useTaskStore';
import { JAM_SCREEN } from '../jam/screen';
import {
  IScreenColors,
  IScreenMode,
} from 'Objects/UIScreen/_props/screenInterface';

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
    task.var[`bitmap_${props.id}`] = 'test';
    //console.log(task);
  };

  /****************************************************/
}
