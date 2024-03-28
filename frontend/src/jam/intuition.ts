import { full, hi, low, med } from 'Objects/UIScreen/screenModes';
import { openScreen } from 'api/os/screen';
import { openWindow } from 'api/os/window';
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
  const screenId = openScreen(task.id, width, height, screenMode, title);
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
  const windowId = openWindow(
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
