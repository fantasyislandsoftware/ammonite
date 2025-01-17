import { ITask } from 'stores/useTaskStore';
import { JAM_SCREEN } from '../jam/screen';
import {
  IScreenColors,
  IScreenMode,
} from 'Objects/UIScreen/_props/screenInterface';

export class BB_SCREEN {
  jam_screen = new JAM_SCREEN();

  /****************************************************/

  Screen = async (
    task: ITask,
    props: {
      id: number;
      offsetX: number;
      offsetY: number;
      width: number;
      height: number;
      depth: IScreenColors;
      mode: IScreenMode;
      title: string;
      bpen: number;
      dpen: number;
      bitmap: number;
    }
  ) => {
    const screen = await this.jam_screen.openScreen(task, {
      id: null,
      x: props.offsetX,
      y: props.offsetY,
      width: props.width,
      height: props.height,
      depth: props.depth,
      mode: props.mode,
      title: props.title,
      dpen: props.dpen,
      bpen: props.bpen,
      bitmap: props.bitmap,
      ret: '',
    });
    task.res.screens.current = props.id;
    if (screen !== undefined) task.res.screens.data[props.id] = screen.screenId;
  };

  /****************************************************/
}
