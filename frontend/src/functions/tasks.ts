import { ITask, TaskArch, TaskState, useTaskStore } from 'stores/useTaskStore';
import { SYSTEM_API as system_api } from 'api/os/api/system';
import { LOGIC_API as logic_api } from 'api/os/api/logic';
import { FONT_API as font_api } from 'api/os/api/font';
import { SCREEN_API as screen_api } from 'api/os/api/screen';
import { WINDOW_API as window_api } from 'api/os/api/window';
import { ICON_API as icon_api } from 'api/os/api/icon';
import { JAM_SYSTEM } from 'api/os/api/jam/system';
import { JAM_FONT as jam_font } from 'api/os/api/jam/font';
import { JAM_LOGIC as jam_logic } from 'api/os/api/jam/logic';
import { JAM_ICON as jam_icon } from 'api/os/api/jam/icon';
import { JAM_SCREEN as jam_screen } from 'api/os/api/jam/screen';
import { JAM_WINDOW as jam_window } from 'api/os/api/jam/window';
import { JAM_DATETIME as jam_datetime } from 'api/os/api/jam/datetime';
import { EnumM68KOP } from 'api/os/api/m68k/IM68k';
import { opTable } from 'api/os/api/m68k/opTable';
import { hex2bin } from './string';
import { MOVE } from 'api/os/api/m68k/MOVE/MOVE';
import { BRA } from 'api/os/api/m68k/BRA/BRA';
import { makeQuerablePromise } from 'api/http/promiseHandling';

const SYSTEM_API = new system_api();
const LOGIC_API = new logic_api();
const FONT_API = new font_api();
const SCREEN_API = new screen_api();
const WINDOW_API = new window_api();
const ICON_API = new icon_api();
//

export const startTaskProcessor = () => {
  const { tasks, setTasks } = useTaskStore.getState();
  return setInterval(() => {
    tasks.map((task) => {
      task = execInstruction(task);
    });
    setTasks(tasks);
  });
};

const execJamInstruction = (self: ITask) => {
  const jam_system = new JAM_SYSTEM(self);
  //const JAM_LOGIC = new jam_logic(self);
  //const JAM_FONT = new jam_font();
  //const JAM_ICON = new jam_icon();
  //const JAM_SCREEN = new jam_screen(self);
  //const JAM_WINDOW = new jam_window(self);
  //const JAM_DATETIME = new jam_datetime(self);

  const lib = [jam_system];

  lib.map((l, index) => {
    Object.getOwnPropertyNames(lib[index]).map((key) => {
      eval(`window["${key}"] = ${lib[index].name}.${key};`);
    });
  });

  const line = self.code[self.pos];
  try {
    if (line !== self.promise.name) {
      self.promise = {
        name: line,
        state: makeQuerablePromise(eval(line)),
      };
    }
  } catch (e) {
    console.log(e);
    console.log(line);
    killTask(self.id);
  }

  if (self.state === TaskState.RUNNING) {
    if (self.promise.state.isFulfilled()) {
      const info = self.promise.state.getData();
      if (info) {
        const { data, v } = info;
        if (v !== undefined) {
          self.var[v] = data;
        }
      }
      self.promise = { name: '', state: null };
      self.pos++;
    }
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
  const dataW: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = `${self.s.m[self.pos + i * 2]
      .toString(16)
      .padStart(2, '0')}${self.s.m[self.pos + 1 + i * 2]
      .toString(16)
      .padStart(2, '0')}`;
    dataW.push(hex2bin(d, 16));
  }

  let opName: string = EnumM68KOP.UNKNOWN;
  let found = false;

  opTable.map((row: any) => {
    if (matchPattern(row.pattern, dataW[0])) {
      opName = row.opName;
      found = true;
    }
  });

  //console.log(found, opName);

  let state = { success: false, task: self };

  if (found) {
    switch (opName) {
      case EnumM68KOP.MOVE:
        state = MOVE(self, dataW, { verbose: false });
        break;
      case EnumM68KOP.BRA:
        state = BRA(self, dataW, { verbose: false });
        break;
      case EnumM68KOP.RTS:
        console.log('rts');
        killTask(self.id);
        break;
    }
  } else {
    console.log('unknown');
    killTask(self.id);
  }

  self = state.task;

  /*if (!state.success) {
    console.log('command not found');
    killTask(self.id);
  }*/

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
