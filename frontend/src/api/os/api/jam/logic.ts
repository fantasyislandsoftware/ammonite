import { ITask } from 'stores/useTaskStore';

export class JAM_LOGIC {
  /****************************************************/

  def = async (task: ITask, v: string, value: any) => {
    task.var[v] = value;
  };

  /****************************************************/

  label = async (task: ITask, label: string) => {
    /* dummy */
  };

  /****************************************************/

  jp = async (task: ITask, jmplabel: string) => {
    task.pos = task.label[jmplabel];
  };

  /****************************************************/

  jpIfElse = async (
    task: ITask,
    jmplabel1: string,
    jmplabel2: string,
    condition: any
  ) => {
    if (condition) {
      task.pos = task.label[jmplabel1];
    } else {
      task.pos = task.label[jmplabel2];
    }
  };

  /****************************************************/

  forLoop = async (
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
  };

  /****************************************************/
}
