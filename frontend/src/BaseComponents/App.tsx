import React, { useEffect, useState } from 'react';
import { UIScreen } from '../Objects/UIScreen';
import { useScreenStore } from '../stores/useScreenStore';
import ShadowBuffer from 'Objects/UIScreen/container/jsx/ShadowBuffer';
import { Backdrop } from 'Objects/UIBackdrop/container/jsx/Backdrop';
import { startTaskProcessor } from 'functions/tasks/tasks';
import { useErrorStore } from 'stores/useErrorStore';
import '../css/base.css';
import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { baseContainerBuildEvents } from 'Objects/UIBase/container/eventHandlers/baseContainerBuildEvents';
import { getHighestScreenZIndex } from 'Objects/UIScreen/_props/screenFunctions';
import { useTaskStore } from 'stores/useTaskStore';
import { JAM_SYSTEM } from 'api/os/api/jam/system';
import SystemCrash from 'BaseComponents/SystemCrash';
import { crash } from 'functions/events/events';
import DebugEvents from './DebugEvents';
import { ENV } from 'constants/globals/env';

const App = () => {
  const { screens, setScreens } = useScreenStore();
  const { tasks } = useTaskStore();
  const [initBoot, setInitBoot] = useState(true);
  const { systemCrash } = useErrorStore();
  const jam_system = new JAM_SYSTEM();

  const initEventListeners = () => {
    window.addEventListener('error', (e) => {
      if (e.error.message !== 'self.postMessage is not a function') {
        crash(e.error.message);
      }
    });
    window.addEventListener('resize', (e) => {
      setScreens(screens);
    });
    document.addEventListener('mouseleave', (e) => {
      baseContainerBuildEvents(e);
    });
    document.addEventListener('keydown', (e) => {
      console.log(screens);
      //console.log(tasks);
    });
  };

  async function boot() {
    jam_system.exec(null, { path: 'src/jam/boot.js' });
  }

  useEffect(() => {
    if (initBoot) {
      setInitBoot(false);
      boot();
      startTaskProcessor();
      renderLoop();
      initEventListeners();
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

  if (systemCrash.state) {
    return <SystemCrash />;
  } else {
    return (
      <>
        {ENV.showEventModal && <DebugEvents />}
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
