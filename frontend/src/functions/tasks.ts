import { getFile } from 'api/os/fileIO';
import { useErrorStore } from 'stores/useErrorStore';
import { ITask, TaskType, useTaskStore } from 'stores/useTaskStore';
import { v4 as uuidv4 } from 'uuid';

interface IParam {
  data: any;
  type: string;
}

export const startTask = async (path: string) => {
  const name = path.substring(path.lastIndexOf('/') + 1);
  const { tasks, setTasks } = useTaskStore.getState();
  const data = (await getFile(path)).split('\n');
  const lines: string[] = [];
  data.forEach((line) => {
    if (line.trimStart().trimEnd() !== '') {
      lines.push(line.trimStart().trimEnd());
    }
  });
  tasks.push({
    id: uuidv4(),
    name: name,
    type: TaskType.JS,
    code: lines,
    vars: {},
    labels: {},
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
  }, 1000);
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
  const p: any = [];
  params.forEach((param) => {
    let data = param.trim();
    let type = 'number';
    if (data.startsWith(`"`)) {
      data = data.substring(1, data.length - 1);
      type = 'string';
    }
    if (param in task.vars) {
      type = 'var';
    }
    p.push({ data: data, type: type });
  });
  return { func: funcName, params: p };
};

export const execCommand = (task: ITask) => {
  const { setSystemCrash } = useErrorStore.getState();
  const line = analyseCommand(task);
  switch (line.func) {
    case 'define':
      define(task, line.params[0], line.params[1]);
      break;
    case 'add':
      add(task, line.params[0], line.params[1]);
      break;
    case 'log':
      log(task, line.params[0]);
      break;
    case 'label':
      label(task, line.params[0]);
      break;
    case 'jmp':
      jmp(task, line.params[0]);
      break;
    default:
      setSystemCrash({ state: true, message: `Unknown command: ${line.func}` });
      break;
  }
  task.pos++;
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

const define = (task: ITask, varName: IParam, value: IParam) => {
  task.vars[varName.data] =
    value.type === 'number' ? Number(value.data) : value.data;
};

const log = (task: ITask, param: { data: any; type: string }) => {
  if (param.type === 'var') {
    param.data = task.vars[param.data];
  }
  console.log(param.data);
};

const add = (task: ITask, varName: IParam, value: IParam) => {
  task.vars[varName.data] = task.vars[varName.data] + Number(value.data);
};

const label = (task: ITask, labelName: IParam) => {
  task.labels[labelName.data] = task.pos;
};

const jmp = (task: ITask, labelName: IParam) => {
  task.pos = task.labels[labelName.data] - 1;
};
