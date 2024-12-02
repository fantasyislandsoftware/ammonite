import { ENV } from 'constants/globals/env';
import { ITask, useTaskStore } from 'stores/useTaskStore';

export class JAM_TASK {
  /****************************************************/

  public tasks: ITask[] = [];
  public setTasks: (tasks: ITask[]) => void;

  /****************************************************/

  constructor() {
    const { tasks, setTasks } = useTaskStore.getState();
    this.tasks = tasks;
    this.setTasks = setTasks;
  }

  /****************************************************/

  getTaskById = async (taskId: string | undefined) => {
    const task = this.tasks.find((task) => task.id === taskId);
    return task;
  };

  /****************************************************/
}
