import { ITask, TaskArch, TaskState, useTaskStore } from 'stores/useTaskStore';
import { SYSTEM } from 'constants/globals/system';
import { SOCKET } from 'constants/globals/socket';
import { v4 as uuidv4 } from 'uuid';
import { getExe } from 'api/http/fileIO';
import {
  ENUM_HUNK_FILE_TYPE,
  IHunks,
} from 'functions/fileProcessing/IFileProcessing';
import {
  fillNumberArray,
  numberWithCommas,
} from 'functions/dataHandling/dataHandling';
import {
  processJamHunks,
  processAmigaHunks,
} from 'functions/fileProcessing/fileProcessing';
import { Buffer } from 'buffer';
import { EnumASMType } from '../m68k/IM68k';
import { JAM_LOGIC } from './logic';
import { JAM_DATETIME } from './datetime';
import { JAM_FONT } from './font';
import { JAM_ICON } from './icon';
import { JAM_SCREEN } from './screen';
import { JAM_WINDOW } from './window';
import { JAM_GRAPHICS } from './graphics';
import { JAM_EVENT } from './event';

declare global {
  interface Window {
    ENV: { [key: string]: string };
  }
}

export class JAM_SYSTEM {
  /****************************************************/

  log = async (task = null, props: { value: string }) => {
    const { value } = props;
    console.log(value);
  };

  /****************************************************/

  exec = async (task = null, props: { path: string; debug?: true }) => {
    const { path, debug } = props;
    const processImports = (self: ITask) => {
      const jam_logic = new JAM_LOGIC();
      const jam_datetime = new JAM_DATETIME();
      const jam_screen = new JAM_SCREEN();
      const jam_window = new JAM_WINDOW();
      const jam_font = new JAM_FONT();
      const jam_icon = new JAM_ICON();
      const jam_graphics = new JAM_GRAPHICS();
      const jam_event = new JAM_EVENT();
      [
        this,
        jam_logic,
        jam_datetime,
        jam_screen,
        jam_window,
        jam_font,
        jam_icon,
        jam_graphics,
        jam_event,
      ].map((lib) => {
        Object.getOwnPropertyNames(lib).map((key) => {
          const upper = key.toUpperCase();
          const isConstant = key === upper;
          const r = `self.lib.${lib.constructor.name}.${key}`;
          for (let n = 0; n < self.code.length; n++) {
            if (isConstant) {
              self.code[n] = self.code[n].replaceAll(`${key}`, `${r}`);
            } else {
              self.code[n] = self.code[n].replaceAll(`${key}(`, `${r}(self,`);
            }
          }
        });
      });
      return self;
    };

    const name = path.substring(path.lastIndexOf('/') + 1);
    const { tasks, setTasks } = useTaskStore.getState();
    const data = (await getExe(path)) as IHunks;

    let block: any = {};

    const mem = new Buffer(data.raw);

    switch (data.type) {
      case ENUM_HUNK_FILE_TYPE.JAM:
        block = processJamHunks(data.hunks);
        break;
      case ENUM_HUNK_FILE_TYPE.AMIGA:
        block = processAmigaHunks(data.hunks);
        break;
    }

    if (!debug) {
      let task: ITask = {
        init: false,
        id: uuidv4(),
        name: name,
        arch: block.arch,
        state: TaskState.RUNNING,
        code: block.code,
        var: {},
        label: block.labels,
        promise: {},
        pos: block.pos,
        s: {
          d0: fillNumberArray(0, 4),
          d1: fillNumberArray(0, 4),
          d2: fillNumberArray(0, 4),
          d3: fillNumberArray(0, 4),
          d4: fillNumberArray(0, 4),
          d5: fillNumberArray(0, 4),
          d6: fillNumberArray(0, 4),
          d7: fillNumberArray(0, 4),
          a0: fillNumberArray(0, 4),
          a1: fillNumberArray(0, 4),
          a2: fillNumberArray(0, 4),
          a3: fillNumberArray(0, 4),
          a4: fillNumberArray(0, 4),
          a5: fillNumberArray(0, 4),
          a6: fillNumberArray(0, 4),
          a7: fillNumberArray(0, 4),
          ccr: fillNumberArray(0, 5),
          m: mem as any,
        },
        pc: block.pos,
        res: { screens: [], windows: [] },
        lib: {
          JAM_SYSTEM: this,
          JAM_FONT: new JAM_FONT(),
          JAM_ICON: new JAM_ICON(),
          JAM_LOGIC: new JAM_LOGIC(),
          JAM_SCREEN: new JAM_SCREEN(),
          JAM_WINDOW: new JAM_WINDOW(),
          JAM_DATETIME: new JAM_DATETIME(),
          JAM_GRAPHICS: new JAM_GRAPHICS(),
          JAM_EVENT: new JAM_EVENT(),
        },
      };
      if (task.arch === TaskArch.JS) {
        task = processImports(task);
      }
      tasks.push(task);
    }

    setTasks(tasks);
  };

  /****************************************************/

  getMem = async (task: ITask, props: { ret: string }) => {
    const { ret } = props;
    SOCKET.NODE.send('REQUEST_MEMORY');
    SOCKET.NODE.onmessage = (event) => {
      const data = JSON.parse(event.data);
      task.var[ret] = {
        total: data.total,
        free: data.free,
        freeStr: numberWithCommas(data.free),
      };
      return;
    };
  };

  /****************************************************/

  setEnv = async (task: ITask, props: { key: string; value: string }) => {
    const { key, value } = props;
    if (!window.ENV) window.ENV = {};
    window.ENV[key] = value;
  };

  /****************************************************/

  getEnv = async (task: ITask, props: { key: string; ret: string }) => {
    const { key, ret } = props;
    task.var[ret] = window.ENV[key];
    return;
  };

  /****************************************************/

  generateUUID = async (task: ITask, props: { ret: string }) => {
    const { ret } = props;
    task.var[ret] = uuidv4();
  };

  /****************************************************/
}
