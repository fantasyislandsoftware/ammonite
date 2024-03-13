import React, { useEffect, useRef } from 'react';
import { baseContainerEvents } from 'Objects/UIBase/container/baseContainerEvents';
import { EnumOSEventObjectType } from 'interface/event';
import { canvasRenderStyle } from 'Objects/UIScreen/styles';
import { useTaskStore } from 'stores/useTaskStore';

export const Backdrop = () => {
  const { tasks } = useTaskStore();
  return (
    <div
      data-id={EnumOSEventObjectType.Backdrop}
      style={{
        width: '100%',
        height: '100%',
        zIndex: -1000,
      }}
      onMouseUp={(event) => baseContainerEvents(event)}
      onMouseMove={(event) => baseContainerEvents(event)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>pos</th>
            <th>vars</th>
            <th>labels</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            let vars = '';
            for (const key in task.vars) {
              vars += `${key}=${task.vars[key]}, `;
            }
            let labels = '';
            for (const key in task.labels) {
              labels += `${key}=${task.labels[key]}, `;
            }
            return (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.pos}</td>
                <td>{vars}</td>
                <td>{labels}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
