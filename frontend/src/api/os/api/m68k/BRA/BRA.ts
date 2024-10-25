import { ITask } from 'stores/useTaskStore';
import { hex2int, int2hex } from 'functions/dataHandling/dataHandling';

export const BRA = (
  task: ITask,
  dataW: string[],
  setting?: {
    verbose: boolean;
  }
) => {
  const i = dataW[0];
  const d = dataW[1];

  const dis_i_bin = `${i[8]}${i[9]}${i[10]}${i[11]}${i[12]}${i[13]}${i[14]}${i[15]}`;
  let dis_i = parseInt(dis_i_bin, 2);

  const dis_d_bin = `${d[0]}${d[1]}${d[2]}${d[3]}${d[4]}${d[5]}${d[6]}${d[7]}${d[8]}${d[9]}${d[10]}${d[11]}${d[12]}${d[13]}${d[14]}${d[15]}`;
  let dis_d = parseInt(dis_d_bin, 2);

  let bit = '';
  let length = 0;
  let dis = 0;
  let fdis = 0;

  if (dis_i > 0) {
    bit = 'b';
    length = 2;
    if (dis_i > 128) {
      dis = 256 - dis_i;
      fdis = task.pos - dis + 2;
    } else {
      dis = dis_i;
      fdis = task.pos + dis + 2;
    }
  } else {
    bit = 'w';
    length = 4;
    if (dis_d > 32768) {
      dis = 65536 - dis_d;
      fdis = task.pos - dis + 2;
    } else {
      dis = dis_d;
      fdis = task.pos + dis + 2;
    }
  }

  const asm = `bra.${bit} 0x${int2hex(fdis, 4)}`;

  /* Log */
  if (setting?.verbose) {
    console.log(dataW);
    console.log(asm);
  }

  return { asm: asm, task: exeBRA(task, asm), success: true };
};

export const exeBRA = (task: ITask, asm: string) => {
  const arg = asm.split(' ');
  const loc = hex2int(arg[1]);

  task.pos = loc;

  return task;
};
