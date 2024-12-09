import { ITask } from 'stores/useTaskStore';

export class JAM_LOGIC {
  /****************************************************/

  def = async (task: ITask, props: { v: string; value: any }) => {
    const { v, value } = props;
    task.var[v] = value;
  };

  /****************************************************/

  label = async (task: ITask, props: { name: string }) => {
    /* dummy */
  };

  /****************************************************/

  jp = async (task: ITask, props: { label: string }) => {
    const { label } = props;
    task.pos = task.label[label];
  };

  /****************************************************/

  jpc = async (
    task: ITask,
    props: { condition: any; goto: string; else: string }
  ) => {
    const { condition, goto, else: elseLabel } = props;
    if (condition) {
      task.pos = task.label[goto];
    } else {
      task.pos = task.label[elseLabel];
    }
  };

  /****************************************************/

  for = async (
    task: ITask,
    props: {
      var: string;
      count: number;
      inc: number;
    }
  ) => {};

  /*forLoop = async (
    task: ITask,
    jmpLabel: string,
    v: string,
    count: number,
    inc: number
  ) => {
    task.var[v] += inc;
    if (task.var[v] < count) {
      task.pos = task.label[jmpLabel];
    }
  };*/

  /****************************************************/

  add = async (task: ITask, props: { ret: string; value: number }) => {
    const { ret, value } = props;
    task.var[ret] = task.var[ret] + value;
  };

  /****************************************************/
}
