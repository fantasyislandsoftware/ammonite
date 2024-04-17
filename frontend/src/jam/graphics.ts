import { getFile } from 'api/http/fileIO';
import { makeQuerablePromise } from 'api/http/promiseHandling';
import BinaryStream from 'api/lib/data/binarystream';
import { detect, parse } from 'api/lib/data/iff';
import { drawLine } from 'api/lib/graphics/draw';
import { ENV } from 'constants/env';
import { IParam } from 'functions/tasks';
import { EnumDataFormat } from 'interface/data';
import { useScreenStore } from 'stores/useScreenStore';
import { ITask } from 'stores/useTaskStore';

export const _loadIcons = (task: ITask, promise: IParam) => {
  const p = getFile(
    `${ENV.baseDir}resource/icons.iff`,
    EnumDataFormat.ARRAY_BUFFER
  );
  p.then((result) => {
    //@ts-ignore
    //const data = window.Buffer.from(result);
    //console.log(data);
    //const stream = BinaryStream(data.slice(0, data.byteLength), true);
    //console.log(stream);
    //const fileType = detect(stream);
    //const iff: any = parse(stream, true, fileType);
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
  drawLine(pixels, 0, 0, 100, 100, 1);
};
