import React, { useEffect, useState } from 'react';
import { Screen } from './components/Screen';
import { processObjectEvents } from 'handlers/events';
import { EnumOSEventType } from 'handlers/events/interface';
import { renderScreen } from 'handlers/screen';
import { useScreenStore } from 'stores/useScreenStore';
import ShadowBuffer from 'ShadowBuffer';

const App = () => {
  const [init, setInit] = useState(false);
  const { screens, setScreens } = useScreenStore();

  window.onresize = () => {
    setScreens(screens);
  };

  /*useEffect(() => {
    if (!init) {
      setInit(true);
      setInterval(() => {
        screens.map((screen) => {
          renderScreen(screen);
        });
        console.log('render');
      }, 1000);
    }
  }, [init]);*/

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        onMouseMove={(event) =>
          processObjectEvents(event, EnumOSEventType.MouseMove)
        }
      ></div>
      {screens.map((screen, index) => (
        <Screen key={index} screen={screen} />
      ))}
      <ShadowBuffer />
    </>
  );
};

export default App;
