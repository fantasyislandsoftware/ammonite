import { getExe, getFile } from 'api/http/fileIO';
import { ENV } from 'constants/globals/env';
import { BREAK, DO_NOT_PROCESS } from 'constants/globals/misc';
import { SYSTEM } from 'constants/globals/system';
import { EnumDataFormat } from 'interface/data';
import { TaskState, TaskType, useTaskStore } from 'stores/useTaskStore';
import { v4 as uuidv4 } from 'uuid';
import { decode as base64_decode } from 'base-64';

enum ENUM_HUNK_BLOCKS {
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
  type: string;
  data: IJamDataHunk[] & IAmigaDataHunk[];
}

interface IHunks {
  type: ENUM_HUNK_BLOCKS;
  hunks: IHunk[];
}

export class SYSTEM_API {
  constructor() {}

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
        hunk.data.map((data) => {
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

        return { code, labels };
      }
    });

    return { code, labels };
  };

  /****************************************************/

  convertArg = (arg: string) => {
    const dreg = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'];
    const areg = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'];

    /* Data register */
    if (dreg.includes(arg)) {
      return `{ t: 'dreg', v: ${arg.replace('d', '')} }`;
    }

    /* Address register */
    if (areg.includes(arg)) {
      return `{ t: 'areg', v: ${arg.replace('d', '')} }`;
    }

    /* Immediate */
    if (arg.startsWith('#')) {
      return `{ t: 'imm', v: ${arg.replace('#', '')} }`;
    }

    /* Unknown */
    return `'?'`;
  };

  /****************************************************/

  convertToMove8 = (data: IAmigaDataHunk) => {
    const args = data.arg.split(',');
    if (args.length === 2) {
      return `M68K_API.move_8(self,${this.convertArg(
        args[0]
      )}, ${this.convertArg(args[1])});`;
    } else {
      return `bad(M68K_API.move_8(self,${data.arg}));`;
    }
  };

  /****************************************************/

  processAmigaHunks = (hunks: IHunk[]) => {
    //console.log(hunks);
    const code: string[] = [];
    hunks.map((hunk) => {
      if (hunk.type === ENUM_HUNK_TYPE.HUNK_CODE) {
        hunk.data.map((data: IAmigaDataHunk, index) => {
          let line = '';
          if (index > 1) {
            console.log(data.op, data.arg);
            switch (data.op) {
              case 'move.b':
                line = this.convertToMove8(data);
                console.log(line);
                code.push(line);
                break;
              case 'nop':
                code.push('M68K_API.nop();');
                break;
              default:
                code.push(`/* ${data.op} ${data.arg} * /`);
                break;
            }
          }
        });
      }
    });
    return { code, labels: {} };
  };

  /****************************************************/

  exec = async (path: string, debug?: true) => {
    const name = path.substring(path.lastIndexOf('/') + 1);
    const { tasks, setTasks } = useTaskStore.getState();
    const data = (await getExe(path)) as IHunks;

    let block: any = {};

    switch (data.type) {
      case ENUM_HUNK_BLOCKS.JAM:
        block = this.processJamHunks(data.hunks);
        break;
      case ENUM_HUNK_BLOCKS.AMIGA:
        block = this.processAmigaHunks(data.hunks);
        break;
    }

    //console.log(block.code);

    !debug &&
      tasks.push({
        id: uuidv4(),
        name: name,
        type: TaskType.JS,
        state: TaskState.RUNNING,
        code: block.code,
        var: {},
        label: block.labels,
        promise: {},
        pos: 0,
        r: {
          d: [0, 0, 0, 0, 0, 0, 0, 0],
          a: [0, 0, 0, 0, 0, 0, 0, 0],
        },
      });
    //setTasks(tasks);
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
