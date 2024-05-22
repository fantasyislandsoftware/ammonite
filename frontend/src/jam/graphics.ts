import { getFile } from 'api/http/fileIO';
import { makeQuerablePromise } from 'api/http/promiseHandling';
import BinaryStream from 'api/lib/data/binarystream';
import { detectIFF, parseIFF } from 'api/lib/data/iff';
import { pixelMerge } from 'api/lib/graphics/pixelArray';
import { ENV } from 'constants/globals/env';
import { IParam } from 'functions/tasks';
import { EnumDataFormat } from 'interface/data';
import { IPixelArray } from 'interface/graphics';
import { useIconStore } from 'stores/useIconStore';
import { useScreenStore } from 'stores/useScreenStore';
import { ITask } from 'stores/useTaskStore';

export const _loadIcons = (task: ITask, promise: IParam) => {
  const { icons, setIcons } = useIconStore.getState();
  const p = getFile(
    `${ENV.baseDir}resource/icons.iff`,
    EnumDataFormat.ARRAY_BUFFER
  );
  p.then((data) => {
    const stream = BinaryStream(data.slice(0, data.byteLength), true);
    const fileType = detectIFF(stream);
    const iff: any = parseIFF(stream, true, fileType);
    const icons = [];
    const offset = 1;
    const size = 32;
    const step = 3;
    for (let ry = 0; ry < 2; ry++) {
      for (let rx = 0; rx < 9; rx++) {
        const icon: IPixelArray = [];
        for (let py = 0; py < size; py++) {
          const row = [];
          for (let px = 0; px < size; px++) {
            const p =
              iff.pixels[py + ry * (size + step) + offset][
                px + rx * (size + step) + offset
              ];
            row.push(p);
          }
          icon.push(row);
        }
        icons.push(icon);
      }
    }
    setIcons(icons);
  });
  task.promise[promise.value] = makeQuerablePromise(p);
};

export const _drawImage = (
  objectType: string,
  id: string,
  x: number,
  y: number,
  imageIndex: number,
  transparentIndex: number
) => {
  const { screens } = useScreenStore.getState();
  const { icons } = useIconStore.getState();
  let pixels: IPixelArray = [];
  switch (objectType) {
    case 'screen':
      const screenIndex = screens.findIndex((s) => s.screenId === id);
      const screen = screens[screenIndex];
      pixels = screen.client.pixels;
      break;
    case 'window':
      break;
  }
  const icon = icons[imageIndex];
  pixels = pixelMerge(icon, pixels, x, y, transparentIndex);
};
