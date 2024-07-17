import { ITask } from 'stores/useTaskStore';
import { move_dn_to_dst } from './move/move_dn_to_dst';
import { EnumASMType, EnumBit } from './IM68k';
import { opTable } from './opTable2';

export interface IM68KArg {
  t: string;
  v: string | number;
}

export class M68K_API {
  /****************************************************/

  move = (self: ITask, bit: EnumBit, arg1: IM68KArg, arg2: IM68KArg) => {
    console.log('move');
    /*switch (arg1.t) {
      case EnumASMType.DREG:
        return move_dn_to_dst(self, bit, arg1, arg2);
    }*/
  };

  /****************************************************/

  bra = (self: ITask, line: number) => {
    self.pos = line;
    if (line === self.pos) {
      self.pos--;
    }
  };

  /****************************************************/

  rts = (self: ITask) => {
    console.log('rts');
  };

  /****************************************************/

  nc = (line: string) => {};

  /****************************************************/

  nop = () => {};

  /****************************************************/
}
