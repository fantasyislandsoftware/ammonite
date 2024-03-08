import { getDirList } from 'api/os/fileIO';
import { ENV } from 'constants/env';
import { useQuery } from 'react-query';

export type UseGetFonts = {
  data: any;
  loading: boolean;
  error: unknown;
};

const getFonts = async (...fontNames: string[]) => {
  const list: { name: string }[] = await getDirList('fonts/');
  console.log(list);
  const data = await Promise.all(
    list.map((font) => {
      const name = font.name.split('.');
      const fontFace = new FontFace(
        name[0],
        `url(${ENV.api}/getFile?path=fonts/${name[0]}.${name[1]})`
      );
      document.fonts.add(fontFace);
    })
  );

  return data;
};

export const useGetFonts = (...fontNames: string[]): UseGetFonts => {
  const { data, isLoading, error } = useQuery(['getFonts'], () =>
    getFonts(...fontNames)
  );
  return {
    data: data,
    loading: isLoading,
    error: error,
  };
};

export default useGetFonts;
