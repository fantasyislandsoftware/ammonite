import { ITask, TaskState, TaskType, useTaskStore } from 'stores/useTaskStore';
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
import { _drawImage, _loadIcons } from 'jam/graphics';
import { EnumDataFormat } from 'interface/data';
import { SCREEN_API } from 'api/os/api/screen';
import { SYSTEM_API } from 'api/os/api/system';
import { FONT_API } from 'api/os/api/font';
import { ICON_API } from 'api/os/api/icon';
import { DO_NOT_PROCESS } from 'constants/globals/misc';
import { WINDOW_API } from 'api/os/api/window';

const system_api = new SYSTEM_API();
const font_api = new FONT_API();
const screen_api = new SCREEN_API();
const window_api = new WINDOW_API();
const icon_api = new ICON_API();

export interface IParam {
  id: string;
  value: string | number;
  type: IData;
}

export enum IData {
  CONSTANT = 'const',
  VAR = 'var',
}

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
  const SYSTEM_API = system_api;
  const FONT_API = font_api;
  const SCREEN_API = screen_api;
  const WINDOW_API = window_api;
  const ICON_API = icon_api;

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

  const line = self.code[self.pos];

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
