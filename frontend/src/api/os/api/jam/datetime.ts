import { ITask } from 'stores/useTaskStore';

export class JAM_DATETIME {
  public HOURS: number = 1000 * 60 * 60;
  public MINUTES: number = 1000 * 60;
  public SECONDS: number = 1000;

  /****************************************************/

  getUnixDateTime = async (task: ITask, props: { ms: number; ret: string }) => {
    const { ms, ret } = props;
    const date = new Date();
    task.var[ret] = Math.ceil(date.getTime() / ms) * ms;
  };

  /****************************************************/
}
