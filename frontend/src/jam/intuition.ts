import { full, hi, low, med } from 'Objects/UIScreen/_props/screenModes';
import { SCREEN_API } from 'api/os/api/screen';
import { WINDOW_API } from 'api/os/api/window';
import { IParam } from 'functions/tasks';
import { ITask } from 'stores/useTaskStore';

export const _openScreen = (
  task: ITask,
  width: number,
  height: number,
  mode: string,
  title: string,
  returnId: IParam
) => {
  const screenAPI = new SCREEN_API();

  let screenMode = low;
  switch (mode) {
    case 'low':
      screenMode = low;
      break;
    case 'med':
      screenMode = med;
      break;
    case 'hi':
      screenMode = hi;
      break;
    case 'full':
      screenMode = full;
      break;
    default:
      screenMode = low;
  }
  const screenId = screenAPI.openScreen(
    task.id,
    width,
    height,
    screenMode,
    title
  );
  task.var[returnId.id] = screenId;
};

export const _openWindow = (
  task: ITask,
  parentScreenId: string,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  returnId: IParam
) => {
  const windowAPI = new WINDOW_API();
  const windowId = windowAPI.openWindow(
    task.id,
    parentScreenId,
    x,
    y,
    width,
    height,
    title
  );
  task.var[returnId.id] = windowId;
};
