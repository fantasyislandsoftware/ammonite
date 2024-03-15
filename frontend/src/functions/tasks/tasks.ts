import { full, hi, low, med } from 'Objects/UIScreen/screenModes';
import { getFile, getFontList } from 'api/os/fileIO';
import { openScreen } from 'api/os/screen';
import { useErrorStore } from 'stores/useErrorStore';
import { useScreenStore } from 'stores/useScreenStore';
import { ITask, TaskState, TaskType, useTaskStore } from 'stores/useTaskStore';
import ts from 'typescript';
import { v4 as uuidv4 } from 'uuid';

interface IParam {
  id: string;
  value: string | number;
  type: IData;
}

enum IData {
  CONSTANT = 'const',
  VAR = 'var',
}

export const startTask = async (path: string) => {
  const name = path.substring(path.lastIndexOf('/') + 1);
  const { tasks, setTasks } = useTaskStore.getState();
  const data = (await getFile(path)).split('\n');
  const lines: string[] = [];
  data.forEach((line) => {
    line = line.trimStart().trimEnd();
    if (line !== '' && !line.startsWith('//') && !line.startsWith('/*')) {
      lines.push(line.trimStart().trimEnd());
    }
  });
  tasks.push({
    id: uuidv4(),
    name: name,
    type: TaskType.JS,
    state: TaskState.RUNNING,
    code: lines,
    var: {},
    label: {},
    promise: {},
    pos: 0,
  });
  setTasks(tasks);
};

export const startTaskProcessor = () => {
  const { tasks, setTasks } = useTaskStore.getState();
  return setInterval(() => {
    tasks.map((task) => {
      task = execCommand(task);
    });
    setTasks(tasks);
  }, 1);
};

export const analyseCommand = (task: ITask) => {
  const str = task.code[task.pos];
  const splitA = str.split('(');
  const funcName = splitA[0];
  let rem = splitA[1];
  if (rem.endsWith(');')) {
    rem = rem.substring(0, rem.length - 2);
  }
  const params = rem.split(',');
  const parray: IParam[] = [];
  params.forEach((param) => {
    const id = param.trim();
    let type = IData.CONSTANT;
    let value = id;

    if (id in task.var) {
      type = IData.VAR;
      value = task.var[id];
    }

    //@ts-ignore
    if (!isNaN(value)) {
      //@ts-ignore
      value = parseInt(value);
    } else {
      if (typeof value === 'string') {
        value = value.replaceAll(`"`, '');
      }
    }

    const processedParam: IParam = { id: id, value: value, type: type };
    parray.push(processedParam);
  });
  return { func: funcName, params: parray };
};

export const execCommand = (task: ITask) => {
  const line = analyseCommand(task);
  switch (line.func) {
    case 'exec':
      _startTask(line.params[0].value as string);
      break;
    case 'define':
      _define(task, line.params[0], line.params[1]);
      break;
    case 'add':
      _add(task, line.params[0], line.params[1]);
      break;
    case 'log':
      _log(task, line.params[0]);
      break;
    case 'label':
      _label(task, line.params[0]);
      break;
    case 'jmp':
      _jmp(task, line.params[0]);
      break;
    case 'jmpIf':
      _jmpIf(
        task,
        line.params[0],
        line.params[1],
        line.params[2],
        line.params[3]
      );
      break;
    case 'loadFontList':
      _loadFontList(task, line.params[0], line.params[1]);
      break;
    case 'processFonts':
      _processFonts(task);
      break;
    case 'getPromiseState':
      _getPromiseState(task, line.params[0], line.params[1]);
      break;
    case 'lengthOf':
      _lengthOf(task, line.params[0], line.params[1]);
      break;
    case 'openScreen':
      _openScreen(
        task,
        line.params[0].value as number,
        line.params[1].value as number,
        line.params[2].value as string,
        line.params[3].value as string
      );
      break;
    default:
      task.state = TaskState.ERROR;
      break;
  }
  if (task.state === TaskState.RUNNING) {
    task.pos++;
  }
  if (task.pos >= task.code.length) {
    killTask(task.id);
  }
  return task;
};

const _startTask = (path: string) => {
  startTask(path);
};

const killTask = (id: string) => {
  const { tasks, setTasks } = useTaskStore.getState();
  tasks.map((task, index) => {
    if (task.id === id) {
      tasks.splice(index, 1);
    }
  });
  setTasks(tasks);
};

const _define = (task: ITask, varName: IParam, value: IParam) => {
  task.var[varName.id] = value.value;
};

const _log = (task: ITask, param: IParam) => {
  console.log(param.value);
};

const _add = (task: ITask, varName: IParam, value: IParam) => {
  //task.var[varName.data] = task.var[varName.data] + Number(value.data);
};

const _label = (task: ITask, label: IParam) => {
  task.label[label.id] = task.pos;
};

const _jmp = (task: ITask, label: IParam) => {
  task.pos = task.label[label.value] - 1;
};

const _jmpIf = (
  task: ITask,
  v1: IParam,
  condition: IParam,
  v2: IParam,
  label: IParam
) => {
  enum ICondition {
    eq = '===',
    notEq = '!==',
    moreThan = '>',
    lessThan = '<',
  }
  const c = ICondition[condition.value as keyof typeof ICondition];
  const calc = `${v1.value} ${c} ${v2.value}`;
  const ev = eval(calc);
  if (ev) {
    task.pos = task.label[label.value] - 1;
  }
};

const _loadFontList = (task: ITask, promise: IParam, fonts: IParam) => {
  const p = getFontList();
  p.then((result) => {
    task.var[fonts.id] = result;
  });
  task.promise[promise.value] = makeQuerablePromise(p);
};

const _processFonts = (task: ITask) => {};

const _getPromiseState = (task: ITask, promise: IParam, dest: IParam) => {
  const result = task.promise[promise.value];
  let state = 0;
  if (result.isFulfilled()) {
    state = 1;
  }
  if (result.isPending()) {
    state = 0;
  }
  if (result.isRejected()) {
    state = 2;
  }
  task.var[dest.id] = state;
};

export function makeQuerablePromise(promise: any) {
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

const _openScreen = (
  task: ITask,
  width: number,
  height: number,
  mode: string,
  title: string
) => {
  let screenMode = low;
  switch (mode) {
    case 'low':
      screenMode = low;
      break;
    case 'med':
      screenMode = med;
      break;
    case 'hi':
      screenMode = hi;
      break;
    case 'full':
      screenMode = full;
      break;
    default:
      screenMode = low;
  }
  openScreen(width, height, screenMode, title);
};

export const _lengthOf = (task: ITask, v: IParam, l: IParam) => {
  //@ts-ignore
  task.var[l.id] = v.value.length;
};
