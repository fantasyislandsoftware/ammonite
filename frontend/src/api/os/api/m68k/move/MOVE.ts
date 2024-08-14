import { ITask } from 'stores/useTaskStore';
import { processOpSize, processXNXT } from '../m68kHelpers';
import { EnumM68KOP } from '../IM68k';
import { EnumOpBit, opBitChar } from 'functions/dataHandling/IdataHandling';
import { _4to1 as __4to1 } from 'functions/dataHandling/dataHandling';

const _4to1 = __4to1;

export const MOVE = (
  task: ITask,
  i: string,
  d: string,
  setting?: {
    verbose: boolean;
  }
) => {
  const { verbose } = setting || { verbose: false };

  let src = {
    key: '',
    loc: '',
    length: 0,
  };
  let dst = {
    key: '',
    loc: '',
    length: 0,
  };
  let length = 0;

  /* Bit Size */
  const opSize_bin = `${i[2]}${i[3]}`;
  const opSize = processOpSize(opSize_bin);

  /* Source */
  const xt_src_bin = `${i[10]}${i[11]}${i[12]}`;
  const xn_src_bin = `${i[13]}${i[14]}${i[15]}`;
  src = processXNXT(xt_src_bin, xn_src_bin, d);

  /* Destination */
  const xn_dst_bin = `${i[4]}${i[5]}${i[6]}`;
  const xt_dst_bin = `${i[7]}${i[8]}${i[9]}`;
  dst = processXNXT(xt_dst_bin, xn_dst_bin, d);

  if (src.length === 4 || dst.length === 4) {
    length = 4;
  } else {
    length = 2;
  }

  let success = true;

  /* */

  /* src address */
  const xn_src = parseInt(xn_src_bin, 2);
  const srcLoc = `${src.loc}`.replace('{n}', xn_src.toString());

  /* dst address */
  const xn_dst = parseInt(xn_dst_bin, 2);
  const dstLoc = `${dst.loc}`.replace('{n}', xn_dst.toString());
  //console.log(dstKey);

  let start = 0;
  if (opSize === EnumOpBit.BYTE) start = 3;
  if (opSize === EnumOpBit.WORD) start = 2;

  const opSizeChar = opBitChar[opSize];

  const ins = `move.${opSizeChar} ${srcLoc},${dstLoc}`
    .replaceAll('task.s.', '')
    .replaceAll('[{i}]', '')
    .replaceAll('{d}', '');
  verbose && console.log(ins);

  for (let i = start; i < 4; i++) {
    const cmd = `${dstLoc} = ${srcLoc}`
      .replaceAll('{i}', i.toString())
      .replaceAll('{d}', parseInt(d, 2).toString());
    //console.log(cmd);
    eval(cmd);
  }

  return { task: task, success: success, length: length };
};
