import React, { useEffect, useRef, useState } from 'react';
import { UIScreen } from './Objects/UIScreen';
import { useScreenStore } from './stores/useScreenStore';
import ShadowBuffer from 'Objects/UIScreen/jsx/ShadowBuffer';
import { Backdrop } from 'Objects/UIBackdrop/jsx/Backdrop';
import { startTask, startTaskProcessor } from 'functions/tasks/tasks';
import { useErrorStore } from 'stores/useErrorStore';
import './css/base.css';
import { getHighestScreenZIndex } from 'functions/screen';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';

const App = () => {
  const { screens } = useScreenStore();
  const [initBoot, setInitBoot] = useState(true);
  const { systemCrash } = useErrorStore();
  const [taskProcessor, setTaskProcessor] = useState<any>(null);

  //const initEventListeners = () => {

  //};

  useEffect(() => {
    async function boot() {
      window.onerror = (message, source, lineno, colno, error) => {
        console.log('test');
      };
      startTask('/home/node/app/src/js/boot.js');
    }
    if (initBoot) {
      boot();
      setInitBoot(false);
      setTaskProcessor(startTaskProcessor());
      renderLoop();
      //initEventListeners();
    }
  }, [initBoot]);

  const renderLoop = () => {
    const topScreen = getHighestScreenZIndex();
    screens.map((screen) => {
      if (screen.zIndex === topScreen) {
        screenContainerRender(screen);
      }
    });
    //window.requestAnimationFrame(renderLoop);
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
