import { ITask, TaskArch, TaskState, useTaskStore } from 'stores/useTaskStore';
import { EnumM68KOP } from 'api/os/api/m68k/IM68k';
import { opTable } from 'api/os/api/m68k/opTable';
import { hex2bin } from '../string/string';
import { MOVE } from 'api/os/api/m68k/opMOVE/MOVE';
import { BRA } from 'api/os/api/m68k/BRA/BRA';
import { makeQuerablePromise } from 'api/http/promiseHandling';

/* JAM API */
import { JAM_SYSTEM } from 'api/os/api/jam/system';
import { JAM_LOGIC } from 'api/os/api/jam/logic';
import { JAM_SCREEN } from 'api/os/api/jam/screen';
import { JAM_WINDOW } from 'api/os/api/jam/window';
import { JAM_DATETIME } from 'api/os/api/jam/datetime';
import { JAM_FONT } from 'api/os/api/jam/font';
import { JAM_ICON } from 'api/os/api/jam/icon';

export const startTaskProcessor = () => {
  const { tasks, setTasks } = useTaskStore.getState();
  return setInterval(() => {
    tasks.map((task) => {
      const result = execInstruction(task);
    });
    setTasks(tasks);
  }, 100);
};

const execJamInstruction = (self: ITask) => {
  const jam_system = new JAM_SYSTEM(self);
  const jam_logic = new JAM_LOGIC(self);
  const jam_datetime = new JAM_DATETIME(self);
  const jam_screen = new JAM_SCREEN(self);
  const jam_window = new JAM_WINDOW(self);
  const jam_font = new JAM_FONT();
  const jam_icon = new JAM_ICON();

  [
    jam_system,
    jam_logic,
    jam_datetime,
    jam_screen,
    jam_window,
    jam_font,
    jam_icon,
  ].map((lib) => {
    Object.getOwnPropertyNames(lib).map((key) => {
      eval(`window["${key}"] = ${lib.constructor.name.toLowerCase()}.${key};`);
    });
  });

  const line = self.code[self.pos];
  if (line !== self.promise.name) {
    self.promise = {
      name: line,
      state: makeQuerablePromise(eval(line), (e) => {
        killTask(self.id, e);
      }),
    };
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
    killTask(self.id, 'unknown instruction');
  }

  self = state.task;

  /*if (!state.success) {
    console.log('command not found');
    killTask(self.id);
  }*/

  return self;
};

export const execInstruction = (task: ITask) => {
  try {
    switch (task.arch) {
      case TaskArch.JS:
        return execJamInstruction(task);
      case TaskArch.M68K:
        return execM68KInstruction(task);
    }
  } catch (e) {
    killTask(task.id, e);
  }
};

const killTask = (id: string, e?: any) => {
  /* Remove screens */
  const jam_screen = new JAM_SCREEN();
  const task = useTaskStore.getState().tasks.find((task) => task.id === id);
  if (task) {
    const { screens } = task.res;
    screens.map((id) => {
      jam_screen.closeScreen(id);
    });
  }

  /* Remove task */
  const { tasks, setTasks } = useTaskStore.getState();
  tasks.map((task, index) => {
    if (task.id === id) {
      tasks.splice(index, 1);
    }
  });
  if (e) {
    console.log({ task: id, error: e });
  }
  setTasks(tasks);
};
