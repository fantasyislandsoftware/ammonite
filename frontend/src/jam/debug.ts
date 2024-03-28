import { IParam } from 'functions/tasks';
import { ITask } from 'stores/useTaskStore';

export const _log = (task: ITask, param: IParam) => {
  console.log(param.value);
};
