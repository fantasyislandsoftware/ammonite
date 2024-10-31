import { ITask, TaskState, useTaskStore } from 'stores/useTaskStore';
import { SYSTEM } from 'constants/globals/system';
import { v4 as uuidv4 } from 'uuid';
import { getExe } from 'api/http/fileIO';
import {
  ENUM_HUNK_FILE_TYPE,
  IHunks,
} from 'functions/fileProcessing/IFileProcessing';
import {
  fillNumberArray,
  numberWithCommas,
} from 'functions/dataHandling/dataHandling';
import {
  processJamHunks,
  processAmigaHunks,
} from 'functions/fileProcessing/fileProcessing';
import { Buffer } from 'buffer';

export class JAM_SYSTEM {
  private self: ITask;

  /****************************************************/

  constructor(self: ITask) {
    this.self = self;
  }

  /****************************************************/

  log = async (value: string) => {
    console.log(value);
  };

  /****************************************************/

  exec = async (path: string, debug?: true) => {
    const name = path.substring(path.lastIndexOf('/') + 1);
    const { tasks, setTasks } = useTaskStore.getState();
    const data = (await getExe(path)) as IHunks;

    let block: any = {};

    const test = new Buffer(data.raw);

    switch (data.type) {
      case ENUM_HUNK_FILE_TYPE.JAM:
        block = processJamHunks(data.hunks);
        break;
      case ENUM_HUNK_FILE_TYPE.AMIGA:
        block = processAmigaHunks(data.hunks);
        break;
    }

    !debug &&
      tasks.push({
        id: uuidv4(),
        name: name,
        arch: block.arch,
        state: TaskState.RUNNING,
        code: block.code,
        var: {},
        label: block.labels,
        promise: {},
        pos: block.pos,
        s: {
          d0: fillNumberArray(0, 4),
          d1: fillNumberArray(0, 4),
          d2: fillNumberArray(0, 4),
          d3: fillNumberArray(0, 4),
          d4: fillNumberArray(0, 4),
          d5: fillNumberArray(0, 4),
          d6: fillNumberArray(0, 4),
          d7: fillNumberArray(0, 4),
          a0: fillNumberArray(0, 4),
          a1: fillNumberArray(0, 4),
          a2: fillNumberArray(0, 4),
          a3: fillNumberArray(0, 4),
          a4: fillNumberArray(0, 4),
          a5: fillNumberArray(0, 4),
          a6: fillNumberArray(0, 4),
          a7: fillNumberArray(0, 4),
          ccr: fillNumberArray(0, 5),
          m: test as any,
        },

        pc: block.pos,
      });
    setTasks(tasks);
  };

  /****************************************************/

  getMem = async (returnVar: string) => {
    this.self.var[returnVar] = {
      total: SYSTEM.memory.total,
      free: SYSTEM.memory.free,
      freeStr: numberWithCommas(SYSTEM.memory.free),
    };
  };

  /****************************************************/
}
