import { TaskArch } from 'stores/useTaskStore';
import { IHunk, IAmigaDataHunk, ENUM_HUNK_TYPE } from './IFileProcessing';

export const processAmigaHunks = (hunks: IHunk[]) => {
  let pos = 0;
  const mem: number[] = [];
  hunks.map((hunk) => {
    hunk.hunkData.map((data: IAmigaDataHunk) => {
      const hexArray = data.hex.split(' ');
      hexArray.map((val) => {
        if (val === '03e9') {
          pos = mem.length + 6;
        }
        for (let n = 0; n < 2; n++) {
          mem.push(parseInt(val.slice(n * 2, n * 2 + 2), 16));
        }
      });
    });
  });
  return { arch: TaskArch.M68K, code: [], labels: {}, mem: mem, pos: pos };
};

export const processJamHunks = (hunks: IHunk[]) => {
  let code: string[] = [];
  const labels: any = {};
  let write = true;
  hunks.map((hunk) => {
    if (hunk.type === ENUM_HUNK_TYPE.HUNK_CODE) {
      hunk.hunkData.map((data) => {
        data.command = data.command.replaceAll('$', 'self.var.');

        /* Squash */
        data.command = squash(data.command);

        /* Remove Comments */
        if (data.command.startsWith('/*')) {
          write = false;
        }
        if (data.command.endsWith('*/')) {
          write = true;
        }

        /* Remove curly braces */
        if (data.command.startsWith('{') || data.command.endsWith('}')) {
          data.command = '{remove}';
        }

        /* Process imports */
        if (data.command.startsWith('import')) {
          data.command = '{remove}';
        }

        /* Add Command */
        if (
          !data.command.startsWith('//') &&
          !data.command.startsWith('/*') &&
          !data.command.startsWith('*/') &&
          data.command !== '' &&
          write
        ) {
          code.push(data.command);
        }
      });

      /* Remove Lines */
      code = code.filter((line) => {
        return line !== '{remove}';
      });

      /* Process Labels */
      const LABEL_CMD = 'label';
      code.map((line, index) => {
        if (line.startsWith(LABEL_CMD)) {
          const label = line
            .replaceAll(LABEL_CMD, '')
            .replaceAll('"', '')
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll(';', '');
          labels[label] = index;
        }
      });
    }
  });

  return { arch: TaskArch.JS, code, labels, mem: [], pos: 0 };
};

const squash = (str: string) => {
  return str.trimStart().trimEnd();
};

/****************************************************/

const codePass1 = (data: string) => {
  const result: string[] = [];
  const lines = data.split('\n');
  lines.forEach((line) => {
    line = squash(line);
    if (line.startsWith('//') || line === '') {
      line = '{remove}';
    }
    if (line !== '{remove}') {
      result.push(line);
    }
  });
  return result.join('\n');
};
