import { IParam } from 'functions/tasks';
import { ITask } from 'stores/useTaskStore';

export const _getArrayElement = (
  task: ITask,
  array: IParam,
  index: IParam,
  field: IParam,
  result: IParam
) => {
  task.var[result.id] = task.var[array.id][index.value];
};

export const _getFieldValue = (
  task: ITask,
  obj: IParam,
  field: IParam,
  v: IParam
) => {
  task.var[v.id] = task.var[obj.id][field.value];
};

export const _lengthOf = (task: ITask, v: IParam, l: IParam) => {
  //@ts-ignore
  task.var[l.id] = v.value.length;
};

export const _getPromiseState = (
  task: ITask,
  promise: IParam,
  dest: IParam
) => {
  const result = task.promise[promise.value];
  let state = 0;
  if (result.isFulfilled()) {
    state = 1;
  }
  if (result.isPending()) {
    state = 0;
  }
  if (result.isRejected()) {
    state = 2;
  }
  task.var[dest.id] = state;
};
