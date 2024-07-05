import { ITask } from 'stores/useTaskStore';
import { move_dn_to_dst } from './move/move_dn_to_dst';
import { EnumBit } from './IM68k';

export interface IM68KArg {
  t: string;
  v: string | number;
}

export class M68K_API {
  /****************************************************/

  move = (self: ITask, bit: EnumBit, arg1: IM68KArg, arg2: IM68KArg) => {
    switch (arg1.t) {
      case 'dreg':
        return move_dn_to_dst(self, bit, arg1, arg2);
    }
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
