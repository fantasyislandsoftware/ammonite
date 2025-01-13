import { ITask } from 'stores/useTaskStore';
import { JAM_WINDOW } from '../jam/window';
import { EWindowState } from 'Objects/UIWindow/_props/windowInterface';

export class BB_WINDOW {
  jam_window = new JAM_WINDOW();
  /****************************************************/

  Window = async (
    task: ITask,
    props: {
      id: number;
      x: number;
      y: number;
      width: number;
      height: number;
      flags: number;
      title: string;
      dpen: number;
      bpen: number;
    }
  ) => {
    /*this.jam_window.openWindow(task, {
    });*/

    const current_screen_index = task.var['current_screen_index'];
    const parentScreenId = task.var[`screen_${current_screen_index}`];
    this.jam_window.openWindow(task, {
      id: null,
      parentScreenId: parentScreenId,
      state: EWindowState.DEFAULT,
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      flags: props.flags,
      title: props.title,
      ret: '',
    });

    task.var[`window_${props.id}`] = 'test';
    console.log(task);
  };

  /****************************************************/
}
