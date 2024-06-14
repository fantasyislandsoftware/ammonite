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
import { DO_NOT_PROCESS } from 'constants/globals/misc';

import { SYSTEM_API as system_api } from 'api/os/api/system';
import { FONT_API as font_api } from 'api/os/api/font';
import { SCREEN_API as screen_api } from 'api/os/api/screen';
import { WINDOW_API as window_api } from 'api/os/api/window';
import { ICON_API as icon_api } from 'api/os/api/icon';
import { M68K_API as m68k_api } from 'api/os/api/m68k';

const SYSTEM_API = new system_api();
const FONT_API = new font_api();
const SCREEN_API = new screen_api();
const WINDOW_API = new window_api();
const ICON_API = new icon_api();
const M68K_API = new m68k_api();

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
  const jp = (label: string) => {
    self.pos = self.label[label];
  };

  const jpif = (label: string, condition?: any, value?: any) => {
    if (condition === value) {
      self.pos = self.label[label];
    }
  };

  const bra = (line: number) => {
    self.pos = line;
    if (line === self.pos) {
      self.pos--;
    }
  };

  const nop = (line: string) => {};

  const ret = () => {};

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
