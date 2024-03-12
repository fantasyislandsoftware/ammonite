import React, { useEffect, useRef, useState } from 'react';
import { UIScreen } from './Objects/UIScreen';
import { useScreenStore } from './stores/useScreenStore';
import ShadowBuffer from 'Objects/UIScreen/jsx/ShadowBuffer';
import { openScreen } from 'api/os/screen';
import { full, hi, interlaced, low, med } from './Objects/UIScreen/screenModes';
import { EnumOSEventObjectType } from 'interface/event';
import { getHighestScreenZIndex } from 'functions/screen';
import useGetGuiIcons from 'api/query/useGetGuiIcons';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { baseContainerEvents } from 'Objects/UIBase/container/baseContainerEvents';
import { openWindow } from 'api/os/window';
import useGetFontsList from 'api/query/useGetFontsList';
import { Backdrop } from 'Objects/UIBackdrop/jsx/Backdrop';
import useGetFonts from 'api/query/useGetFonts';
import './css/base.css';
import { useFontStore } from 'stores/useFontStore';
//import './fonts/amiga4ever.ttf';

const App = () => {
  const [ready, setReady] = useState(false);
  const { screens, setScreens, setSelectedScreen } = useScreenStore();
  const { fonts } = useFontStore();
  let loaded = false;

  const mockScreens = () => {
    //openScreen(window.innerWidth, window.innerHeight, full, 'Full Screen');
    //openScreen(640, 512, hi, 'Hi Res');
    //openScreen(320, 512, interlaced, 'Interlaced');
    const medId = openScreen(640, 256, med, 'Med Res');
    //
    const lowId = openScreen(320, 256, low, 'Low Res');
    setTimeout(() => {
      openWindow(lowId, 20, 20, 100, 50, 'Test Window');
      openWindow(medId, 20, 20, 100, 50, 'Test Window');
    }, 10);
  };

  const addEventListeners = () => {
    /* Debug */
    document.body.addEventListener('keydown', function (e) {
      /*if (e.keyCode === 32) {
        screens.map((screen) => {
          console.log(screen.zIndex);
        });
      }*/
    });
    /* */
    window.addEventListener('resize', (e) => {
      setScreens(screens);
    });
    /* */
    document.addEventListener('mouseleave', (e) => {
      baseContainerEvents(e);
    });
  };

  const ref = useRef<HTMLCanvasElement>(null);

  const getFonts = useGetFonts(ref);

  if (!getFonts.loading) {
    loaded = true;
    console.log(fonts);
  }

  const renderLoop = () => {
    const topScreen = getHighestScreenZIndex();
    screens.map((screen) => {
      if (screen.zIndex === topScreen) {
        screenContainerRender(screen);
      }
    });
    window.requestAnimationFrame(renderLoop);
  };

  useEffect(() => {
    if (loaded) {
      mockScreens();
      setReady(true);
      setTimeout(() => {
        setScreens(screens);
        setSelectedScreen(undefined);
      });
      renderLoop();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      addEventListeners();
    }
  }, [loaded]);

  /*return (
    <>
      <div style={{ font: '8px Amiga Forever' }}>test</div>
    </>
  );*/

  return (
    <>
      {ready ? (
        <>
          {screens.map((screen, index) => (
            <UIScreen key={index} screen={screen} />
          ))}
          <ShadowBuffer />
          <Backdrop />
        </>
      ) : (
        <div>Loading</div>
      )}
      <canvas ref={ref}></canvas>
    </>
  );
};

export default App;
