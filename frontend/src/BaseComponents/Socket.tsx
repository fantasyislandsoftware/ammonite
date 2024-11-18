import { SYSTEM } from 'constants/globals/system';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

enum Request {
  MEMORY = 'REQUEST_MEMORY',
}

const Socket = () => {
  const [init, setInit] = useState(false);

  const WS_URL = 'ws://localhost:1235';
  const socket = useWebSocket(WS_URL);

  const ws = socket.getWebSocket();
  if (ws) {
    ws.onmessage = (event) => {
      //console.log(event.data);
      SYSTEM.memory = JSON.parse(event.data);
    };
  }

  useEffect(() => {
    if (!init) {
      setInit(true);
      setInterval(() => {
        socket.sendMessage(Request.MEMORY);
      }, 1000);
    }
  }, [init]);

  return null;
};

export default Socket;
