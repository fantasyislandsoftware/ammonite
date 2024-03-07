import { useEffect, useState } from 'react';

export const useFonts = (...fontNames: string[]) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Promise.all(
      fontNames.map((fontName) => {
        const name = fontName.split('.');
        console.log(name);
        const fontFace = new FontFace(
          name[0],
          `url(http://localhost:1234/getFile?path=fonts/${name[0]}.${name[1]})`
        );
        document.fonts.add(fontFace);
      })
    ).then(() => {
      setIsLoaded(true);
    });
  }, [fontNames]);

  return isLoaded;
};
