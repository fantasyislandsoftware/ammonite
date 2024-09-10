import { getExe, getFile } from 'api/http/fileIO';
import { ENV } from 'constants/globals/env';
import { BREAK, DO_NOT_PROCESS } from 'constants/globals/misc';
import { SYSTEM } from 'constants/globals/system';
import {
  fillNumberArray,
  genM68KAddrSpace,
} from 'functions/dataHandling/dataHandling';
import { EnumDataFormat } from 'interface/data';
import { TaskState, TaskArch, useTaskStore } from 'stores/useTaskStore';
import { v4 as uuidv4 } from 'uuid';
var Buffer = require('buffer/').Buffer;

enum ENUM_HUNK_FILE_TYPE {
  JAM = 'jam',
  AMIGA = 'amiga',
}

enum ENUM_HUNK_TYPE {
  HUNK_CODE = 'HUNK_CODE',
  HUNK_DATA = 'HUNK_DATA',
}

interface IJamDataHunk {
  line: number;
  command: string;
}

interface IAmigaDataHunk {
  addr: string;
  hex: string;
  op: string;
  arg: string;
}

interface IHunk {
  type: ENUM_HUNK_TYPE;
  hunkData: IJamDataHunk[] & IAmigaDataHunk[];
}

interface IHunks {
  type: ENUM_HUNK_FILE_TYPE;
  raw: Buffer;
  hunks: IHunk[];
}

export class SYSTEM_API {
  constructor() {
    
  }

  /****************************************************/

  systemCrash = (message: string) => {
    
  };

  /****************************************************/

  squash = (str: string) => {
    return str.trimStart().trimEnd();
  };

  /****************************************************/

  codePass1 = (data: string) => {
    const result: string[] = [];
    const lines = data.split('\n');
    lines.forEach((line) => {
      line = this.squash(line);
      if (line.startsWith('//') || line === '') {
        line = '{remove}';
      }
      if (line !== '{remove}') {
        result.push(line);
      }
    });
    return result.join('\n');
  };

  /****************************************************/

  processJamHunks = (hunks: IHunk[]) => {
    let code: string[] = [];
    const labels: any = {};
    let write = true;
    hunks.map((hunk) => {
      if (hunk.type === ENUM_HUNK_TYPE.HUNK_CODE) {
        const imports: { name: string; file: string | undefined }[] = [];
        hunk.hunkData.map((data) => {
          /* Squash */
          data.command = this.squash(data.command);

          /* Remove Comments */
          if (data.command.startsWith('/*')) {
            write = false;
          }
          if (data.command.endsWith('*/')) {
            write = true;
          }

          /* Process imports */
          if (data.command.startsWith('import')) {
            let importLine = data.command.split(' ');
            data.command = '{remove}';
            importLine = importLine.filter((part) => {
              if (
                part !== 'import' &&
                part !== '{' &&
                part !== '}' &&
                part !== 'from'
              ) {
                return part;
              }
            });
            const importFile = importLine
              .pop()
              ?.replaceAll('"', '')
              .replaceAll(';', '');
            importLine.forEach((part) => {
              imports.push({ name: part.replace(',', ''), file: importFile });
            });
          }

          /* Add Command */
          if (
            !data.command.startsWith('//') &&
            !data.command.startsWith('/*') &&
            !data.command.startsWith('*/') &&
            data.command !== '' &&
            write
          ) {
            code.push(data.command);
          }
        });

        /* Post Process */

        /* Add Command Parents */
        code.map((line, index) => {
          imports.map((imp) => {
            code[index] = code[index].replaceAll(
              imp.name,
              `${imp.file}.${imp.name}`
            );
          });
        });

        /* Remove Lines */
        code = code.filter((line) => {
          return line !== '{remove}';
        });

        /* Process Labels */
        const LABEL_CMD = 'LOGIC_API.label';
        code.map((line, index) => {
          if (line.startsWith(LABEL_CMD)) {
            const label = line
              .replaceAll(LABEL_CMD, '')
              .replaceAll('"', '')
              .replaceAll('(', '')
              .replaceAll(')', '')
              .replaceAll(';', '');
            labels[label] = index;
          }
        });
      }
    });

    return { arch: TaskArch.JS, code, labels, mem: [], pos: 0 };
  };

  /****************************************************/

  processAmigaHunks = (hunks: IHunk[]) => {
    let pos = 0;
    const mem: number[] = [];
    hunks.map((hunk) => {
      hunk.hunkData.map((data: IAmigaDataHunk) => {
        const hexArray = data.hex.split(' ');
        hexArray.map((val) => {
          if (val === '03e9') {
            pos = mem.length + 6;
          }
          for (let n = 0; n < 2; n++) {
            mem.push(parseInt(val.slice(n * 2, n * 2 + 2), 16));
          }
        });
      });
    });

    return { arch: TaskArch.M68K, code: [], labels: {}, mem: mem, pos: pos };
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
        block = this.processJamHunks(data.hunks);
        break;
      case ENUM_HUNK_FILE_TYPE.AMIGA:
        block = this.processAmigaHunks(data.hunks);
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
          d0: fillNumberArray(0, 8),
          d1: fillNumberArray(0, 8),
          d2: fillNumberArray(0, 8),
          d3: fillNumberArray(0, 8),
          d4: fillNumberArray(0, 8),
          d5: fillNumberArray(0, 8),
          d6: fillNumberArray(0, 8),
          d7: fillNumberArray(0, 8),
          a0: fillNumberArray(0, 8),
          a1: fillNumberArray(0, 8),
          a2: fillNumberArray(0, 8),
          a3: fillNumberArray(0, 8),
          a4: fillNumberArray(0, 8),
          a5: fillNumberArray(0, 8),
          a6: fillNumberArray(0, 8),
          a7: fillNumberArray(0, 8),
          c: fillNumberArray(0, 2),
          //m: block.mem,
          m: test,
        },
      });
    setTasks(tasks);
  };

  /****************************************************/

  getPromise(promise: any) {
    // Don't modify any promise that has been already modified.
    if (promise.isFulfilled) return promise;

    // Set initial state
    let isPending = true;
    let isRejected = false;
    let isFulfilled = false;
    let data: any = null;

    // Observe the promise, saving the fulfillment in a closure scope.
    const result = promise.then(
      function (v: any) {
        isFulfilled = true;
        isPending = false;
        data = v;
        return v;
      },
      function (e: any) {
        isRejected = true;
        isPending = false;
        throw e;
      }
    );

    result.isFulfilled = function () {
      return isFulfilled;
    };
    result.isPending = function () {
      return isPending;
    };
    result.isRejected = function () {
      return isRejected;
    };
    result.getData = function () {
      return data;
    };
    return result;
  }

  /****************************************************/

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getMem = () => {
    return {
      total: SYSTEM.memory.total,
      free: SYSTEM.memory.free,
      freeStr: this.numberWithCommas(SYSTEM.memory.free),
    };
  };

  /****************************************************/
}
