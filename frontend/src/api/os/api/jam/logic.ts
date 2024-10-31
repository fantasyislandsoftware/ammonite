import { ITask } from 'stores/useTaskStore';

export class JAM_LOGIC {
  private self: ITask;

  /****************************************************/

  constructor(self: ITask) {
    this.self = self;
  }

  /****************************************************/

  def = async (v: string, value: any) => {
    this.self.var[v] = value;
  };

  /****************************************************/

  label = async (label: string) => {
    /* dummy */
  };

  /****************************************************/

  jp = async (jmplabel: string) => {
    this.self.pos = this.self.label[jmplabel];
  };

  /****************************************************/

  jpIfElse = async (jmplabel1: string, jmplabel2: string, condition: any) => {
    if (condition) {
      this.self.pos = this.self.label[jmplabel1];
    } else {
      this.self.pos = this.self.label[jmplabel2];
    }
  };

  /****************************************************/

  forLoop = async (jmpLabel: string, v: string, count: number, inc: number) => {
    this.self.var[v] += inc;
    if (this.self.var[v] < count) {
      this.self.pos = this.self.label[jmpLabel];
    }
  };

  /****************************************************/
}
