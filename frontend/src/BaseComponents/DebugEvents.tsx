import { STATE } from 'constants/globals/state';
import React from 'react';

const DebugEvents = () => {
  //console.log(STATE.events);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 9999,
        color: 'white',
        backgroundColor: 'black',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {STATE.events.map((event, index) => {
        return (
          <div key={index}>
            {event.objectType} {event.event.type}
          </div>
        );
      })}
    </div>
  );
};

export default DebugEvents;
