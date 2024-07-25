import { ITask, TaskArch, TaskState, useTaskStore } from 'stores/useTaskStore';

import { SYSTEM_API as system_api } from 'api/os/api/system';
import { LOGIC_API as logic_api } from 'api/os/api/logic';
import { FONT_API as font_api } from 'api/os/api/font';
import { SCREEN_API as screen_api } from 'api/os/api/screen';
import { WINDOW_API as window_api } from 'api/os/api/window';
import { ICON_API as icon_api } from 'api/os/api/icon';

import { convertArg, processMOVE } from 'api/os/api/m68k/m68kHelpers';
import { EnumM68KOP } from 'api/os/api/m68k/IM68k';

import { opTable } from 'api/os/api/m68k/opTable';
import { hex2bin } from './string';

const SYSTEM_API = new system_api();
const LOGIC_API = new logic_api();
const FONT_API = new font_api();
const SCREEN_API = new screen_api();
const WINDOW_API = new window_api();
const ICON_API = new icon_api();

export const startTaskProcessor = () => {
  const { tasks, setTasks } = useTaskStore.getState();
  return setInterval(() => {
    tasks.map((task) => {
      task = execInstruction(task);
    });
    setTasks(tasks);
  }, 1);
};

const execJamInstruction = (self: ITask) => {
  const line = self.code[self.pos];
  try {
    eval(line);
  } catch (e) {
    console.log(e);
    console.log(line);
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

const matchPattern = (pattern: string, value: string) => {
  const long = 16;
  const p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === value[i]) {
      p[i] = 1;
    } else {
      p[i] = 0;
    }
    if (pattern[i] === 'X') {
      p[i] = 1;
    }
  }

  let x = 0;
  p.map((val) => {
    if (val === 1) {
      x++;
    }
  });

  return x === long;
};

const execM68KInstruction = (self: ITask) => {
  const inst = hex2bin(
    `${self.s.m[self.pos].toString(16).padStart(2, '0')}${self.s.m[self.pos + 1]
      .toString(16)
      .padStart(2, '0')}`
  );

  const data = hex2bin(
    `${self.s.m[self.pos + 2].toString(16).padStart(2, '0')}${self.s.m[
      self.pos + 3
    ]
      .toString(16)
      .padStart(2, '0')}`
  );

  let opName: string = EnumM68KOP.UNKNOWN;
  let found = false;
  let length = 0;
  opTable.map((row: any) => {
    if (matchPattern(row.pattern, inst)) {
      opName = row.opName;
      found = true;
    }
  });

  if (found) {
    switch (opName) {
      case EnumM68KOP.MOVE:
        length = processMOVE(self, inst, data);
        break;
    }
  } else {
    console.log('unknown');
    killTask(self.id);
  }

  self.pos += length;

  killTask(self.id);

  return self;
};

export const execInstruction = (task: ITask) => {
  switch (task.arch) {
    case TaskArch.JS:
      return execJamInstruction(task);
    case TaskArch.M68K:
      return execM68KInstruction(task);
  }
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
