import { ITask } from 'stores/useTaskStore';
import { IM68KArg } from '../m68k';
import { EnumASMType, EnumBit } from '../IM68k';
import { move_dn_to_dn } from './move_dn_to_dn/move_dn_to_dn';
import { move_dn_to_abs } from './move_dn_to_abs/move_dn_to_abs';
import { move_dn_to_ind } from './move_dn_to_ind/move_dn_to_ind';

export const move_dn_to_dst = (
  self: ITask,
  bit: EnumBit,
  arg1: IM68KArg,
  arg2: IM68KArg
) => {
  switch (arg2.t) {
    case EnumASMType.DREG:
      return move_dn_to_dn(self, bit, arg1, arg2);
    case EnumASMType.ABS_W:
      return move_dn_to_abs(self, bit, arg1, arg2);
    case EnumASMType.ABS_L:
      return move_dn_to_abs(self, bit, arg1, arg2);
    case EnumASMType.IND:
      return move_dn_to_ind(self, bit, arg1, arg2);
    default:
  }
};
