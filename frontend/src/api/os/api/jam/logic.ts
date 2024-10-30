import { ITask } from 'stores/useTaskStore';

export class JAM_LOGIC {
  private self: ITask;
  constructor(self: ITask) {
    this.self = self;
  }
  /* */
  def = async (v: string, value: any) => {
    this.self.var[v] = value;
  };
  /* */
  forLoop = async (start: number, interation: number, v: string) => {};
  /* */
  forNext = async (v: string) => {};
  /* */
  label = async (label: string) => {};
  /* */
  jpif = async (label: string, condition: any, v: string, inc: number) => {
    if (v) {
      this.self.var[v] += inc;
    }
    if (condition) {
      this.self.pos = this.self.label[label];
    }
  };
  /* */
  jp = async (label: string) => {
    this.self.pos = this.self.label[label];
  };
}
