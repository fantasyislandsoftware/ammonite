import { getFile } from 'api/http/fileIO';
import { BREAK, DO_NOT_PROCESS } from 'constants/globals/misc';
import { EnumDataFormat } from 'interface/data';
import { TaskState, TaskType, useTaskStore } from 'stores/useTaskStore';
import { v4 as uuidv4 } from 'uuid';

export class SYSTEM_API {
  constructor() {}

  /****************************************************/

  exec = async (path: string) => {
    const squash = (str: string) => {
      return str.trimStart().trimEnd();
    };

    const pass1 = (data: string) => {
      const result: string[] = [];
      const lines = data.split('\n');
      lines.forEach((line) => {
        line = squash(line);
        if (line.startsWith('//') || line === '') {
          line = '{remove}';
        }
        if (line !== '{remove}') {
          result.push(line);
        }
      });
      return result.join('\n');
    };

    const name = path.substring(path.lastIndexOf('/') + 1);
    const { tasks, setTasks } = useTaskStore.getState();
    let data = await getFile(path, EnumDataFormat.TEXT);

    data = pass1(data);

    data = data
      .replaceAll('\n', '')
      .replaceAll(';', BREAK)
      .replaceAll('*/', BREAK)
      .split(BREAK);
    const lines: string[] = [];
    const label: any = {};
    const _funcList: any = [];
    data.forEach((line: string, index: number) => {
      /* Remove comment remains */
      if (line.startsWith('/*')) {
        line = DO_NOT_PROCESS;
      }

      /* Process Imports */
      if (line.startsWith('import')) {
        const _whole = line.split(' ');
        const _file = _whole.slice(-1)[0].replaceAll('"', '');
        _whole.forEach((part) => {
          if (
            part !== 'import' &&
            part !== 'from' &&
            part !== '{' &&
            part !== '}' &&
            part !== ',' &&
            part !== `"${_file}"`
          ) {
            _funcList.push({ name: part.replace(',', ''), file: _file });
          }
        });

        line = DO_NOT_PROCESS;
      }

      /* Process function calls */
      _funcList.forEach((func: any) => {
        if (line.includes(func.name)) {
          line = line.replaceAll(func.name, `${func.file}.${func.name}`);
        }
      });

      /* Label */
      if (line.startsWith('label')) {
        const l = line.split('"')[1];
        label[l] = index;
        line = DO_NOT_PROCESS;
      }

      lines.push(line);
    });
    tasks.push({
      id: uuidv4(),
      name: name,
      type: TaskType.JS,
      state: TaskState.RUNNING,
      code: lines,
      var: {},
      label: label,
      promise: {},
      pos: 0,
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
}
