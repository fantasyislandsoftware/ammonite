import React from 'react';
import { Screen } from './components/Screen';
import { useScreenStore } from './components/Screen/useScreenStore';
import { processObjectEvents } from 'handlers/events';
import { EnumOSEventType } from 'handlers/events/interface';
import { EnumScreenModeType } from 'components/Screen/interface';
import { set } from 'lodash';

const App = () => {
  const { screens, setScreens } = useScreenStore();

  window.onresize = () => {
    setScreens(screens);
  };

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
    </>
  );
};

export default App;
