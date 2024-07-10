import { ITask, TaskArch, TaskState, useTaskStore } from 'stores/useTaskStore';

import { SYSTEM_API as system_api } from 'api/os/api/system';
import { LOGIC_API as logic_api } from 'api/os/api/logic';
import { FONT_API as font_api } from 'api/os/api/font';
import { SCREEN_API as screen_api } from 'api/os/api/screen';
import { WINDOW_API as window_api } from 'api/os/api/window';
import { ICON_API as icon_api } from 'api/os/api/icon';
import { M68K_API as m68k_api } from 'api/os/api/m68k/m68k';

const SYSTEM_API = new system_api();
const LOGIC_API = new logic_api();
const FONT_API = new font_api();
const SCREEN_API = new screen_api();
const WINDOW_API = new window_api();
const ICON_API = new icon_api();
const M68K_API = new m68k_api();

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

const execM68KInstruction = (self: ITask) => {
  return self;
};

export const execInstruction = (task: ITask) => {
  const self =
    task.arch === TaskArch.JS
      ? execJamInstruction(task)
      : execM68KInstruction(task);

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
