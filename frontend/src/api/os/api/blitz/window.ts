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
    const currentScreenIndex = task.res.screens.current;
    if (currentScreenIndex === undefined) return;
    const parentScreenId = task.res.screens.data[currentScreenIndex];

    const window = await this.jam_window.openWindow(task, {
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

    task.res.windows.current = props.id;
    task.res.windows.data[props.id] = window.windowId;
    console.log(task);
  };

  /****************************************************/
}
