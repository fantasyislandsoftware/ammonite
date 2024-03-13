import { getDirList, getFile } from 'api/os/fileIO';
import { useQuery } from 'react-query';

export type UseGetFontsList = {
  data: any;
  loading: boolean;
  error: unknown;
};

const getFontsList = async () => {
  const path = 'fonts/';
  const fontListResponse = await getDirList(path);
  const fontListData = await fontListResponse;

  const fonts: any = [];
  fontListData.map(async (font: any) => {
    //console.log(font);
    const fontResponse = await getFile(`${path}/${font.name}`);
    const fontData = await fontResponse;
    //fonts.push({ name: font.name, data: fontData.file });
  });

  console.log(fonts);

  //const x = await getFile('fonts/amiga4ever.ttf');

  return fonts;
};

export const useGetFontsList = (): UseGetFontsList => {
  const { data, isLoading, error } = useQuery(['fonts'], () => getFontsList());
  return {
    data: data,
    loading: isLoading,
    error: error,
  };
};

export default useGetFontsList;
