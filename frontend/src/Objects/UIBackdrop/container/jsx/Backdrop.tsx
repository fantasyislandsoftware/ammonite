import React from 'react';
import { baseContainerBuildEvents } from 'Objects/UIBase/container/eventHandlers/baseContainerBuildEvents';
import { EnumOSEventObjectType } from 'functions/events/IEvents';
import { TaskState, useTaskStore } from 'stores/useTaskStore';

export const Backdrop = () => {
  const { tasks } = useTaskStore();

  return (
    <div
      data-id={EnumOSEventObjectType.Backdrop}
      style={{
        width: '100%',
        height: '100%',
        zIndex: -1000,
        userSelect: 'none',
      }}
      onMouseUp={(event) => baseContainerBuildEvents(event)}
      onMouseMove={(event) => baseContainerBuildEvents(event)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>state</th>
            <th>pos</th>
            <th>var</th>
            <th>label</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            let vars = '';
            for (const key in task.var) {
              vars += `${key}=${task.var[key]}, `;
            }
            let labels = '';
            for (const key in task.label) {
              labels += `${key}=${task.label[key]}, `;
            }
            let promise = '';
            for (const key in task.promise) {
              promise += `${key}`;
            }
            return (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td
                  style={{
                    color: task.state === TaskState.RUNNING ? 'white' : 'red',
                  }}
                >
                  {task.state}
                </td>
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
