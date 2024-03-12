import { useQuery } from 'react-query';
import { ENV } from 'constants/env';
import { getFontList } from 'api/os/fileIO';
import { useFontStore } from 'stores/useFontStore';

export type UseGetFonts = {
  data: any;
  loading: boolean;
  error: unknown;
};

const getFonts = async (ref: any) => {
  const list: { name: string; path: string }[] = await getFontList();

  const { fonts, setFonts } = useFontStore.getState();

  const fontPromise: any = [];
  list.map((font) => {
    const fontFace = new FontFace(
      font.name,
      `url(${ENV.api}/getFile?path=${font.path})`
    );
    fontFace.load().then((data) => {
      //console.log(data);
      fonts.push({ name: '' });
      setFonts(fonts);
    });
    fontPromise.push(fontFace.load());
    document.fonts.add(fontFace);
  });
  const data = await Promise.all(fontPromise);
  return data;
};

export const useGetFonts = (ref: any): UseGetFonts => {
  const { data, isLoading, error } = useQuery(['getFonts'], () =>
    getFonts(ref)
  );

  /*if (data && !isLoading) {
    const canvas = ref.current.getContext('2d', { willReadFrequently: true });
    console.log(canvas);
    data.map((font) => {});
  }*/

  return {
    data: data,
    loading: isLoading,
    error: error,
  };
};

export default useGetFonts;
