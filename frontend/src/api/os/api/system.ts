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
    const result: string[] = [];
    let write = true;
    hunks.map((hunk) => {
      if (hunk.type === ENUM_HUNK_TYPE.HUNK_CODE) {
        hunk.data.map((data) => {
          if (data.command.startsWith('/*')) {
            write = false;
          }
          if (data.command.endsWith('*/')) {
            write = true;
          }
          data.command = this.squash(data.command);
          if (
            !data.command.startsWith('//') &&
            !data.command.startsWith('/*') &&
            !data.command.startsWith('*/') &&
            data.command !== '' &&
            write
          ) {
            result.push(data.command);
          }
        });
        return result;
      }
    });
    return result;
  };

  /****************************************************/

  exec = async (path: string, debug?: true) => {
    const name = path.substring(path.lastIndexOf('/') + 1);
    const { tasks, setTasks } = useTaskStore.getState();
    const data = (await getExe(path)) as IHunks;

    let code: string[] = [];

    switch (data.type) {
      case ENUM_HUNK_BLOCKS.JAM:
        code = this.processJamHunks(data.hunks);
        break;
      case ENUM_HUNK_BLOCKS.AMIGA:
        //this.processAmiga(response, name, debug);
        break;
    }

    console.log(code);

    //let { code } = response;
    //const { org } = response;

    //code = base64_decode(code);
    //code = pass1(code);

    //code = code
    //  .replaceAll('\n', '')
    //  .replaceAll(';', BREAK)
    //  .replaceAll('*/', BREAK)
    //  .split(BREAK);
    //const lines: string[] = [];
    //const label: any = {};
    //const _funcList: any = [];
    //code.forEach((line: string, index: number) => {
    /* Remove comment remains */
    //  if (line.startsWith('/*')) {
    //    line = DO_NOT_PROCESS;
    //  }

    /* Process Imports */
    //  if (line.startsWith('import')) {
    //    const _whole = line.split(' ');
    //    const _file = _whole.slice(-1)[0].replaceAll('"', '');
    //    _whole.forEach((part) => {
    //      if (
    //        part !== 'import' &&
    //        part !== 'from' &&
    //        part !== '{' &&
    //        part !== '}' &&
    //        part !== ',' &&
    //        part !== `"${_file}"`
    //      ) {
    //        _funcList.push({ name: part.replace(',', ''), file: _file });
    //      }
    //    });

    //    line = DO_NOT_PROCESS;
    //  }

    /* Process function calls */
    //  _funcList.forEach((func: any) => {
    //    if (line.includes(func.name)) {
    //      line = line.replaceAll(func.name, `${func.file}.${func.name}`);
    //    }
    //  });

    /* Label */
    //  if (line.startsWith('label')) {
    //    const l = line.split('"')[1];
    //    label[l] = index;
    //    line = DO_NOT_PROCESS;
    //  }

    //  lines.push(line);
    //});
    //console.log(lines);

    /*!debug &&
      tasks.push({
        id: uuidv4(),
        name: name,
        type: TaskType.JS,
        state: TaskState.RUNNING,
        code: lines,
        var: {},
        label: label,
        promise: {},
        pos: org,
        reg: {
          d0: 0,
          d1: 0,
          d2: 0,
          d3: 0,
          d4: 0,
          d5: 0,
          d6: 0,
          d7: 0,
          a0: 0,
          a1: 0,
          a2: 0,
          a3: 0,
          a4: 0,
          a5: 0,
          a6: 0,
          a7: 0,
        },
        flag: {
          c: false,
          v: false,
          z: false,
          n: false,
          x: false,
        },
      });*/
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
