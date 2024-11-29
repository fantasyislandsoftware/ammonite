import { ITask } from 'stores/useTaskStore';

export class JAM_DATETIME {
  public HOURS: number = 1000 * 60 * 60;
  public MINUTES: number = 1000 * 60;
  public SECONDS: number = 1000;

  /****************************************************/

  getUnixDateTime = async (task: ITask, ms: number, returnVar: string) => {
    const date = new Date();
    task.var[returnVar] = Math.ceil(date.getTime() / ms) * ms;
  };

  /****************************************************/
}
