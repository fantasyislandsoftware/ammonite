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
import { _drawImage, _loadIcons } from 'jam/graphics';
import { EnumDataFormat } from 'interface/data';
import { SCREEN_API } from 'api/os/api/screen';
import { SYSTEM_API } from 'api/os/api/system';
import { LOGIC_API } from 'api/os/api/logic';

const logic_api = new LOGIC_API();
const system_api = new SYSTEM_API();
const screen_api = new SCREEN_API();

export interface IParam {
  id: string;
  value: string | number;
  type: IData;
}

export enum IData {
  CONSTANT = 'const',
  VAR = 'var',
}

const DO_NOT_PROCESS = '{do_not_process}';
const BREAK = '{break}';

const squash = (str: string) => {
  return str.toLowerCase().trimStart();
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

export const startTask = async (path: string) => {
  const name = path.substring(path.lastIndexOf('/') + 1);
  const { tasks, setTasks } = useTaskStore.getState();
  let data = await getFile(path, EnumDataFormat.TEXT);

  data = pass1(data);

  data = data
    .replaceAll('\n', '')
    .replaceAll(';', BREAK)
    .replaceAll('*/', BREAK)
    .split(BREAK);
  //console.log(data);
  const lines: string[] = [];
  const label: any = {};
  data.forEach((line: string, index: number) => {
    /* Remove comment remains */
    if (line.startsWith('/*')) {
      line = DO_NOT_PROCESS;
    }

    /* Remove Imports */
    if (line.startsWith('import')) {
      line = DO_NOT_PROCESS;
    }

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

export const startTaskProcessor = () => {
  const { tasks, setTasks } = useTaskStore.getState();
  return setInterval(() => {
    tasks.map((task) => {
      task = execCommand(task);
    });
    setTasks(tasks);
  }, 1);
};

export const execCommand = (self: ITask) => {
  const jp = (label: string) => {
    self.pos = self.label[label];
  };

  const jpif = (label: string, condition?: any, value?: any) => {
    if (condition === value) {
      self.pos = self.label[label];
    }
  };

  for (let n = self.pos; n < self.code.length; n++) {
    if (self.code[n] === DO_NOT_PROCESS) {
      continue;
    }
    self.pos = n;
    break;
  }

  let line = self.code[self.pos];

  try {
    eval(line);
  } catch (e) {
    console.log(e);
    killTask(self.id);
  }

  if (self.state === TaskState.RUNNING) {
    self.pos++;
  }
  if (self.pos >= self.code.length) {
    killTask(self.id);
  }
  return self;
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
