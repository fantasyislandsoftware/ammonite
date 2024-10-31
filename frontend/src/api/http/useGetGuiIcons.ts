import { useQuery } from 'react-query';
import guiIconsPath from '../../assets/gfx/gui.iff';
import { IBrush } from 'functions/graphics/IGraphics';
import BinaryStream from 'functions/dataHandling/binarystream';
import { detectIFF, parseIFF } from 'functions/graphics/iff';
import { useIntuitionStore } from 'stores/useIntuitionStore';
import { initPixelArray } from 'functions/graphics/pixelArray';

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
  const fileType = detectIFF(stream);
  const iff: any = parseIFF(stream, true, fileType);
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
