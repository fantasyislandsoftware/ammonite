import { IDeviceMemory } from 'constants/globals/interface';
import { NETWORK } from 'constants/globals/network';
import { STATE } from 'constants/globals/state';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketHandler = () => {
  const [init, setInit] = useState(false);

  NETWORK.socket = io('http://localhost:1235');

  useEffect(() => {
    if (!init) {
      setInit(true);
      setInterval(() => {
        NETWORK.socket.emit('getMemory');
      }, 10000);
    }
  }, [init]);

  useEffect(() => {
    NETWORK.socket.on('returnGetMemory', (data: IDeviceMemory) => {
      STATE.memory = data;
    });
  }, [NETWORK.socket]);

  return null;
};

export default SocketHandler;
