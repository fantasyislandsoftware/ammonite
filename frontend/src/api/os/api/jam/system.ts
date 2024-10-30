import { ITask } from 'stores/useTaskStore';
import { SYSTEM_API } from '../system';
import { SYSTEM } from 'constants/globals/system';

export class JAM_SYSTEM {
  public name: string = 'jam_system';
  private self: ITask;
  constructor(self: ITask) {
    this.self = self;
  }
  /* */
  log = async (value: string) => {
    console.log(value);
  };
  /* */
  exec = async (path: string) => {
    const system_api = new SYSTEM_API();
    system_api.exec(path);
  };
  /* */
  getMem = async (returnVar: string) => {
    this.self.var[returnVar] = {
      total: SYSTEM.memory.total,
      free: SYSTEM.memory.free,
      freeStr: this.numberWithCommas(SYSTEM.memory.free),
    };
  };
  /* */
  numberWithCommas = async (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  /* */
}
