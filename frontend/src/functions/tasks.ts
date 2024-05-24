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

const squash = (str: string) => {
  return str.toLowerCase().trimStart();
};

export const startTask = async (path: string) => {
  const name = path.substring(path.lastIndexOf('/') + 1);
  const { tasks, setTasks } = useTaskStore.getState();
  let data = await getFile(path, EnumDataFormat.TEXT);
  data = data.split('\n');
  const lines: string[] = [];
  const label: any = {};
  data.forEach((line: string, index: number) => {
    /* Imports */
    if (squash(line).startsWith('import')) {
      line = `// ${line}`;
    }
    line = line.replaceAll('LOGIC_API', 'logic_api');
    line = line.replaceAll('SYSTEM_API', 'system_api');
    line = line.replaceAll('SCREEN_API', 'screen_api');

    /* Label */

    if (squash(line).startsWith('label')) {
      const l_a = squash(line).split('label("')[1];
      const l_b = l_a.split('");')[0];
      label[l_b] = index;
      line = `// ${line}`;
    }

    /* Add */
    lines.push(line);
  });
  console.log(lines);
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

export const execCommand = (self: ITask) => {
  const jp = (label: string) => {
    self.pos = self.label[label];
  };

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
