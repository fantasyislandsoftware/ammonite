import { ITask } from 'stores/useTaskStore';

export class JAM_DATETIME {
  private self: ITask;
  public HOURS: number = 1000 * 60 * 60;
  public MINUTES: number = 1000 * 60;
  public SECONDS: number = 1000;
  /* */
  constructor(self: ITask) {
    this.self = self;
  }
  /* */

  /* */
  getUnixDateTime = async (returnVar: string, ms: number) => {
    const date = new Date();
    this.self.var[returnVar] = Math.ceil(date.getTime() / ms) * ms;
  };
  /* */
}
