import { getFile } from 'api/http/fileIO';
import { ITask, TaskState, TaskType, useTaskStore } from 'stores/useTaskStore';
import { v4 as uuidv4 } from 'uuid';
import { _addFont, _loadFontList } from 'jam/fonts';
import {
  _getArrayElement,
  _getFieldValue,
  _getPromiseState,
  _lengthOf,
} from 'jam/data';
import { _openScreen, _openWindow } from 'jam/intuition';
import { _jmp, _jmpIf, _label } from 'jam/logic';
import { _add, _sub } from 'jam/maths';
import { _define } from 'jam/branch';
import { _log } from 'jam/debug';
import { _startTask } from 'jam/task';
import { _drawIcon } from 'jam/graphics';

export interface IParam {
  id: string;
  value: string | number;
  type: IData;
}

export enum IData {
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
    case 'sub':
      _sub(task, line.params[0], line.params[1]);
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
    case 'addFont':
      _addFont(task, line.params[0], line.params[1], line.params[2]);
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
        line.params[3].value as string,
        line.params[4]
      );
      break;
    case 'openWindow':
      _openWindow(
        task,
        line.params[0].value as string,
        line.params[1].value as number,
        line.params[2].value as number,
        line.params[3].value as number,
        line.params[4].value as number,
        line.params[5].value as string,
        line.params[6]
      );
      break;
    case 'getArrayElement':
      _getArrayElement(
        task,
        line.params[0],
        line.params[1],
        line.params[2],
        line.params[3]
      );
      break;
    case 'getFieldValue':
      _getFieldValue(task, line.params[0], line.params[1], line.params[2]);
      break;
    case 'drawIcon':
      _drawIcon(
        task,
        line.params[0],
        line.params[1],
        line.params[2],
        line.params[3]
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

const killTask = (id: string) => {
  const { tasks, setTasks } = useTaskStore.getState();
  tasks.map((task, index) => {
    if (task.id === id) {
      tasks.splice(index, 1);
    }
  });
  setTasks(tasks);
};
