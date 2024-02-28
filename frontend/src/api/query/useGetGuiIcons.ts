import { useQuery } from 'react-query';
import guiIconsPath from '../../assets/gfx/gui.iff';
import { initPixelArray } from 'functions/graphics';
import { IBrush } from 'interface/graphics';
import BinaryStream from 'api/lib/binarystream';
import { detect, parse } from 'api/lib/iff';
import { useIntuitionStore } from 'stores/useIntuitionStore';

export type UseGetGuiIcons = {
  data: any;
  loading: boolean;
  error: unknown;
};

const getGuiIcons = async () => {
  const { guiIcons, setGuiIcons } = useIntuitionStore.getState();

  const response = await fetch(guiIconsPath);
  const data = await response.arrayBuffer();
  const stream = BinaryStream(data.slice(0, data.byteLength), true);
  const fileType = detect(stream);
  const iff: any = parse(stream, true, fileType);
  const w = 32;
  const h = 32;
  const o = 1;
  const images: IBrush[] = [];
  let ox = o;
  let oy = o;
  for (let cy = 0; cy < 6; cy++) {
    for (let cx = 0; cx < 6; cx++) {
      const image: IBrush = {
        width: w,
        height: h,
        pixels: initPixelArray(32, 32, 0),
      };
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const c = iff.pixels[oy + y][ox + x];
          image.pixels[y][x] = c;
        }
      }
      images.push(image);
      ox += w + 3;
    }
    ox = o;
    oy += h + 3;
  }
  setGuiIcons(images);
  return data;
};

const useGetGuiIcons = (): UseGetGuiIcons => {
  const { data, isLoading, error } = useQuery(['icons'], () => getGuiIcons());
  return {
    data: data,
    loading: isLoading,
    error: error,
  };
};

export default useGetGuiIcons;
