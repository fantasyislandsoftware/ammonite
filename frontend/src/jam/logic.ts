import { IParam } from 'functions/tasks';
import { ITask } from 'stores/useTaskStore';

export const _label = (task: ITask, label: IParam) => {
  //task.label[label.id] = task.pos;
};

export const _jmp = (task: ITask, label: IParam) => {
  //task.pos = task.label[label.value] - 1;
};

export const _jmpIf = (
  task: ITask,
  v1: IParam,
  condition: IParam,
  v2: IParam,
  label: IParam
) => {
  enum ICondition {
    eq = '===',
    notEq = '!==',
    moreThan = '>',
    lessThan = '<',
  }
  const c = ICondition[condition.value as keyof typeof ICondition];
  const calc = `${v1.value} ${c} ${v2.value}`;
  const ev = eval(calc);
  if (ev) {
    //task.pos = task.label[label.value] - 1;
  }
};
