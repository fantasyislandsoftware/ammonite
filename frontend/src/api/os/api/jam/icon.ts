import { getFile } from 'api/http/fileIO';
import BinaryStream from 'api/lib/data/binarystream';
import { detectIFF, parseIFF } from 'api/lib/data/iff';
import { ENV } from 'constants/globals/env';
import { EnumDataFormat } from 'interface/data';
import { IPixelArray } from 'interface/graphics';
import { useIconStore } from 'stores/useIconStore';

export class JAM_ICON {
  constructor() {}

  /****************************************************/

  loadIcons = () => {
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
    return p;
  };

  /****************************************************/
}
