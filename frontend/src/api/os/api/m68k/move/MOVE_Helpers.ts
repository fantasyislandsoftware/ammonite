import { l, splitLongInto4Bytes } from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

const _l = l;

export const REG_S = 'task.s[ {SR0} ][ i + 3 - o ]';
export const REG_D = 'task.s[ {DR0} ][ i + 3 - o ]';

export const ABX_S = 'task.s.m[ {SR0} + i ]';
export const ABX_D = 'task.s.m[ {DR0} + i ]';

export const IMM_S = 'immA[ i + 3 - o ]';

export const I_S = 'task.s.m[ _l(task,{SR0}) + i ]';
export const I_D = 'task.s.m[ _l(task,{DR0}) + i ]';

export const IWD_S = 'task.s.m[ _l(task,{SR0}) + i + {SD0} ]';
export const IWD_D = 'task.s.m[ _l(task,{DR0}) + i + {DD0} ]';

export const IWDI_S = 'task.s.m[ {SD0} + i + _l(task,{SR0}) + _l(task,{SR1}) ]';
export const IWDI_D = 'task.s.m[ {DD0} + i + _l(task,{DR0}) + _l(task,{DR1}) ]';

export const PCD_S = 'task.s.m[ i + {SD0} ]';
export const PCD_D = 'task.s.m[ i + {DD0} ]';

export const PCID_S = 'task.s.m[ i + {SD0} + _l(task,{SR0}) ]';
export const PCID_D = 'task.s.m[ i + {DD0} + _l(task,{DR0}) ]';

export const EQU = ' = ';

export const crunch = (
  task: ITask,
  opBit: EnumOpBit,
  param: {
    src?: { reg?: string[]; dis?: string[] };
    dst?: { reg?: string[]; dis?: string[] };
  },
  js: { loop: string; preDec?: string[]; postInc?: string[]; imm?: string },
  setting?: { debug?: boolean; verbose?: boolean }
) => {
  const srcReg = param.src?.reg;
  const srcDis = param.src?.dis;
  const dstReg = param.dst?.reg;
  const dstDis = param.dst?.dis;

  let immA = [0, 0, 0, 0];
  if (js.imm) {
    immA = splitLongInto4Bytes(parseInt(js.imm.replace('#', '')));
  }

  /* Clean up args */
  srcReg?.forEach((v, i) => {
    srcReg[i] = cleanArg(v);
  });
  srcDis?.forEach((v, i) => {
    srcDis[i] = cleanArg(v);
  });
  dstReg?.forEach((v, i) => {
    dstReg[i] = cleanArg(v);
  });
  dstDis?.forEach((v, i) => {
    dstDis[i] = cleanArg(v);
  });

  const debug = setting?.debug;
  const verbose = setting?.verbose;

  /* Replacers */
  srcReg?.forEach((v, i) => {
    js.loop = js.loop.replaceAll(`{SR${i}}`, `${srcReg[i]}`);
  });
  srcDis?.forEach((v, i) => {
    js.loop = js.loop.replaceAll(`{SD${i}}`, `${srcDis[i]}`);
  });
  dstReg?.forEach((v, i) => {
    js.loop = js.loop.replaceAll(`{DR${i}}`, `${dstReg[i]}`);
  });
  dstDis?.forEach((v, i) => {
    js.loop = js.loop.replaceAll(`{DD${i}}`, `${dstDis[i]}`);
  });

  /* */
  if (verbose) {
    console.log(js);
  }

  /* Offset */
  let o = 0;
  switch (opBit) {
    case EnumOpBit.BYTE:
      o = 0;
      break;
    case EnumOpBit.WORD:
      o = 1;
      break;
    case EnumOpBit.LONG:
      o = 3;
      break;
  }

  /* Pre Decrement */
  if (js.preDec && !debug) {
    for (let i = 0; i < js.preDec.length; i++) {
      const reg = js.preDec[i];
      let l = _l(task, reg);
      l = l - opBit / 8;
      task.s[reg] = splitLongInto4Bytes(l);
    }
  }

  /* Main Loop */
  for (let i = 0; i < opBit / 8; i++) {
    if (!debug) {
      eval(js.loop);
    }
  }

  /* Post Increment */
  if (js.postInc && !debug) {
    for (let i = 0; i < js.postInc.length; i++) {
      const reg = js.postInc[i];
      let l = _l(task, reg);
      l = l + opBit / 8;
      task.s[reg] = splitLongInto4Bytes(l);
    }
  }

  return task;
};

export const cleanArg = (arg: string) => {
  if (arg.startsWith('0x')) {
    arg = arg.replaceAll('0x', '').replaceAll('.w', '').replaceAll('.l', '');
    arg = parseInt(arg, 16).toString();
  } else {
    arg = `"${arg}"`;
  }
  return arg;
};
