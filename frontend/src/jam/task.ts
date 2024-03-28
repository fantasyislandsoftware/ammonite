import { startTask } from 'functions/tasks';

export const _startTask = (path: string) => {
  startTask(path);
};
