import { getFile } from 'api/http/fileIO';
import { makeQuerablePromise } from 'api/http/promiseHandling';
import BinaryStream from 'api/lib/data/binarystream';
import { detectIFF, parseIFF } from 'api/lib/data/iff';
import { drawLine } from 'api/lib/graphics/draw';
import { ENV } from 'constants/env';
import { IParam } from 'functions/tasks';
import { EnumDataFormat } from 'interface/data';
import { IPixelArray } from 'interface/graphics';
import { useScreenStore } from 'stores/useScreenStore';
import { ITask } from 'stores/useTaskStore';

export const _loadIcons = (task: ITask, promise: IParam) => {
  const p = getFile(
    `${ENV.baseDir}resource/icons.iff`,
    EnumDataFormat.ARRAY_BUFFER
  );
  p.then((data) => {
    const stream = BinaryStream(data.slice(0, data.byteLength), true);
    const fileType = detectIFF(stream);
    const iff: any = parseIFF(stream, true, fileType);
    //console.log(iff?.pixels);
    const icons = [];
    for (let ry = 0; ry < 2; ry++) {
      for (let rx = 0; rx < 9; rx++) {
        let icon: IPixelArray = [];
        for (let py = 0; py < 32; py++) {
          let row = [];
          for (let px = 0; px < 32; px++) {
            const p = iff.pixels[py][px];
            row.push(p);
          }
          icon.push(row);
        }
        icons.push(icon);
      }
    }
    console.log(icons);
  });
  task.promise[promise.value] = makeQuerablePromise(p);
};

export const _drawIcon = (
  task: ITask,
  screenId: IParam,
  x: IParam,
  y: IParam,
  icon: IParam
) => {
  const { screens } = useScreenStore.getState();
  const screenIndex = screens.findIndex((s) => s.screenId === screenId.value);
  const screen = screens[screenIndex];
  const pixels = screen.client.pixels;
  //drawLine(pixels, 0, 0, 100, 100, 1);
};
