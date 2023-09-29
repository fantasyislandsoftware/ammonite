import React from 'react';
import { Screen } from './components/Screen';
import { app } from './components/Screen/constants';
import { useScreenStore } from './components/Screen/useScreenStore';
import { processObjectEvents } from 'handlers/events';
import { EnumOSEventType } from 'handlers/events/interface';

const App = () => {
  const { screens } = useScreenStore();

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
      <div style={{ padding: `${app.margin}%` }}>
        {screens.map((screen, index) => (
          <Screen key={index} screen={screen} />
        ))}
      </div>
    </>
  );
};

export default App;
