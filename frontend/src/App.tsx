import React, { useEffect, useState } from 'react';
import { Screen } from './uiObjects/Screen';
import { processObjectEvents } from 'functions/events/events';
import { useScreenStore } from 'stores/useScreenStore';
import ShadowBuffer from 'ShadowBuffer';
import { openScreen } from 'api/os/screen';
import { full, hi, interlaced, low, med } from 'uiObjects/Screen/screenModes';
import { EnumOSEventObjectType } from 'interface/event';
import { getHighestScreenZIndex, renderScreen } from 'functions/screen';
import useGetGuiIcons from 'api/query/useGetGuiIcons';
import { get } from 'lodash';

const App = () => {
  const [ready, setReady] = useState(false);
  const { screens, setScreens, selectedScreen } = useScreenStore();
  let loaded = false;

  const mockScreens = () => {
    //openScreen(window.innerWidth, window.innerHeight, full, 'Full Screen');
    //openScreen(640, 512, hi, 'Hi Res');
    //openScreen(320, 512, interlaced, 'Interlaced');
    openScreen(640, 256, med, 'Med Res');
    openScreen(320, 256, low, 'Low Res');
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
      processObjectEvents(e);
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
        renderScreen(screen);
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
          onMouseUp={(event) => processObjectEvents(event)}
          onMouseMove={(event) => processObjectEvents(event)}
          onContextMenu={(e) => e.preventDefault()}
        ></div>
        {screens.map((screen, index) => (
          <Screen key={index} screen={screen} />
        ))}
        <ShadowBuffer />
      </>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default App;
