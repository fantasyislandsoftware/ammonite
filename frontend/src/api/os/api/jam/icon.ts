import { getFile } from 'api/http/fileIO';
import BinaryStream from 'functions/dataHandling/binarystream';
import { detectIFF, parseIFF } from 'functions/graphics/iff';
import { ENV } from 'constants/globals/env';
import { IPixelArray } from 'functions/graphics/IGraphics';
import { useIconStore } from 'stores/useIconStore';
import { EnumDataFormat } from 'functions/dataHandling/IntDataHandling';
import { ITask } from 'stores/useTaskStore';

export class JAM_ICON {
  /****************************************************/

  loadIcons = async (task: ITask | null) => {
    task = null;

    const { setIcons } = useIconStore.getState();
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
    return p;
  };

  /****************************************************/

  getIcon = async (task: ITask, props: { index: number; ret: string }) => {
    const { index, ret } = props;
    const { icons } = useIconStore.getState();
    task.var[ret] = icons[index];
  };

  /****************************************************/
}
