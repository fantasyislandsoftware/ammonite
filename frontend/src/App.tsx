import React, { useEffect, useState } from 'react';
import { UIScreen } from './UIObjects/UIScreen';
import { useScreenStore } from './stores/useScreenStore';
import ShadowBuffer from 'UIObjects/UIScreen/jsx/ShadowBuffer';
import { openScreen } from 'api/os/screen';
import {
  full,
  hi,
  interlaced,
  low,
  med,
} from './UIObjects/UIScreen/screenModes';
import { EnumOSEventObjectType } from 'interface/event';
import { getHighestScreenZIndex } from 'functions/screen';
import useGetGuiIcons from 'api/query/useGetGuiIcons';
import { screenContainerRender } from 'UIObjects/UIScreen/container/screenContainerRender';
import { baseContainerEvents } from 'UIObjects/UIBase/container/baseContainerEvents';
import { openWindow } from 'api/os/window';

const App = () => {
  const [ready, setReady] = useState(false);
  const { screens, setScreens, setSelectedScreen } = useScreenStore();
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

  const useGuiIcons = useGetGuiIcons();
  if (useGuiIcons.data && !useGuiIcons.loading) {
    loaded = true;
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
    if (ready) {
      addEventListeners();
    }
  }, [ready]);

  if (ready) {
    return (
      <>
        <div
          data-id={EnumOSEventObjectType.Backdrop}
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1000,
          }}
          onMouseUp={(event) => baseContainerEvents(event)}
          onMouseMove={(event) => baseContainerEvents(event)}
          onContextMenu={(e) => e.preventDefault()}
        ></div>
        {screens.map((screen, index) => (
          <UIScreen key={index} screen={screen} />
        ))}
        <ShadowBuffer />
      </>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default App;
