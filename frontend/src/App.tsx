import React, { useEffect, useState } from 'react';
import { UIScreen } from './Objects/UIScreen';
import { useScreenStore } from './stores/useScreenStore';
import ShadowBuffer from 'Objects/UIScreen/container/jsx/ShadowBuffer';
import { Backdrop } from 'Objects/UIBackdrop/container/jsx/Backdrop';
import { startTaskProcessor } from 'functions/tasks';
import { useErrorStore } from 'stores/useErrorStore';
import './css/base.css';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { baseContainerBuildEvents } from 'Objects/UIBase/container/eventHandlers/baseContainerBuildEvents';
import { getHighestScreenZIndex } from 'Objects/UIScreen/_props/screenFunctions';
import { SYSTEM_API } from 'api/os/api/system';
import { getExe, getMem } from 'api/http/fileIO';
import { SYSTEM } from 'constants/globals/system';
import { decode as base64_decode } from 'base-64';

const App = () => {
  const { screens, setScreens } = useScreenStore();
  const [initBoot, setInitBoot] = useState(true);
  const { systemCrash } = useErrorStore();
  const [taskProcessor, setTaskProcessor] = useState<any>(null);
  const system_api = new SYSTEM_API();

  const initEventListeners = () => {
    window.addEventListener('resize', (e) => {
      setScreens(screens);
    });
    document.addEventListener('mouseleave', (e) => {
      baseContainerBuildEvents(e);
    });
    document.addEventListener('keydown', (e) => {
      console.log(screens);
    });
  };

  const updateMem = async () => {
    const mem = await getMem();
    SYSTEM.memory = mem;
  };

  const heartBeat = () => {
    updateMem();
    setInterval(() => {
      updateMem();
    }, 8000);
  };

  const test = () => {
    const x = getExe('/home/node/app/src/jam/boot.js');
    x.then((data) => {
      let decoded = base64_decode(data.code);
      console.log(decoded);
    });
  };

  useEffect(() => {
    async function boot() {
      window.onerror = (message, source, lineno, colno, error) => {
        console.log(message, source, lineno, colno, error);
      };
      system_api.exec('/home/node/app/src/jam/boot.js');
    }
    if (initBoot) {
      boot();
      setInitBoot(false);
      setTaskProcessor(startTaskProcessor());
      renderLoop();
      initEventListeners();
      heartBeat();
      test();
    }
  }, [initBoot]);

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
    if (systemCrash.state) {
      clearInterval(taskProcessor);
    }
  }, [systemCrash.state]);

  if (systemCrash.state) {
    return <div>{systemCrash.message}</div>;
  } else {
    return (
      <>
        {screens.map((screen, index) => (
          <UIScreen key={index} screen={screen} />
        ))}
        <ShadowBuffer />
        <Backdrop />
      </>
    );
  }
};

export default App;
