import { getFile, getFontList } from 'api/os/fileIO';
import { useErrorStore } from 'stores/useErrorStore';
import { ITask, TaskState, TaskType, useTaskStore } from 'stores/useTaskStore';
import { v4 as uuidv4 } from 'uuid';

interface IParam {
  label: string;
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
    if (line !== '' && !line.startsWith('//')) {
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
    //let data: any = param.trim();
    /*if (data.startsWith(`"`)) {
      data = data.substring(1, data.length - 1);
    }*/
    //console.log(task.var);
    //let type = IData.CONSTANT;
    //if (data in task.var) {
    //  type = IData.VAR;
    //} else {
    /*if (!isNaN(data)) {
        data = parseInt(data);
      }*/
    //}

    const label = param.trim();
    let type = IData.CONSTANT;
    let value = label;

    if (label in task.var) {
      type = IData.VAR;
      value = task.var[label];
    }

    //@ts-ignore
    if (!isNaN(value)) {
      //@ts-ignore
      value = parseInt(value);
    }

    const x: IParam = { label: label, value: value, type: type };
    console.log(x);
    p.push(x);
  });
  return { func: funcName, params: p };
};

export const execCommand = (task: ITask) => {
  const line = analyseCommand(task);
  //console.log(line.params);
  /*line.params.map((param: any) => {
    console.log(param);
  });*/
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
    case 'jmpIf':
      jmpIf(
        task,
        line.params[0],
        line.params[1],
        line.params[2],
        line.params[3]
      );
      break;
    case 'loadFonts':
      loadFonts(task, line.params[0]);
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
    //task.pos = 0;
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
  task.var[varName.label] = value.value;
};

const log = (task: ITask, param: IParam) => {
  //console.log(param);
  /*if (param.type === IData.VAR) {
    console.log(task.var[param.data]);
  }*/
  //if (param.type === 'var') {
  //  param.label = task.var[param.t];
  //}
  //console.log(param.data);
};

const add = (task: ITask, varName: IParam, value: IParam) => {
  //task.var[varName.data] = task.var[varName.data] + Number(value.data);
};

const label = (task: ITask, labelName: IParam) => {
  //task.label[labelName.data] = task.pos;
};

const jmp = (task: ITask, labelName: IParam) => {
  task.pos = task.label[labelName.value] - 1;
};

const jmpIf = (
  task: ITask,
  labelName: IParam,
  v1: IParam,
  condition: IParam,
  v2: IParam
) => {
  /*if (v1.type === IData.VAR) {
    v1.data = task.var[v1.data];
  }
  if (v2.type === IData.VAR) {
    v2.data = task.var[v2.data];
  }*/
  //const calc = `${v1.data} ${condition.data} ${v2.data}`;
  //console.log(calc);
  //const x = eval(calc);
  //console.log(x);
};

const loadFonts = (task: ITask, promiseName: any) => {
  task.promise[promiseName.data] = getFontList();
  //const x = await getFontList();
  //console.log(x);
};
