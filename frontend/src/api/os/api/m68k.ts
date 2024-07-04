import { ITask } from 'stores/useTaskStore';

export interface IM68KArg {
  t: string;
  v: string | number;
}

export class M68K_API {
  constructor() {}

  /****************************************************/

  move_8 = (self: ITask, arg1: IM68KArg, arg2: IM68KArg) => {
    /* Copy DN to ? */
    if (arg1.t === 'dreg') {
      if (arg2.t === 'dreg') {
        self.r.d[arg2.v as number] = self.r.d[arg1.v as number];
      }
    }

    /* Copy IMM to ? */
    if (arg1.t === 'imm') {
      if (arg2.t === 'dreg') {
        self.r.d[arg2.v as number] = arg1.v as number;
      }
    }

    return self;
  };

  /****************************************************/

  bra = (self: ITask, line: number) => {
    self.pos = line;
    if (line === self.pos) {
      self.pos--;
    }
  };

  /****************************************************/

  rts = (self: ITask) => {};

  /****************************************************/

  nc = (line: string) => {};

  /****************************************************/

  nop = () => {};

  /****************************************************/
}
