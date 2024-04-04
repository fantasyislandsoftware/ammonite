import { screenContainerRender } from 'Objects/UIScreen/container/screenContainerRender';
import { drawLine } from 'api/lib/graphics/draw';
import { IParam } from 'functions/tasks';
import { render } from 'react-dom';
import { useIntuitionStore } from 'stores/useIntuitionStore';
import { useScreenStore } from 'stores/useScreenStore';
import { ITask } from 'stores/useTaskStore';

export const _drawIcon = (
  task: ITask,
  screenId: IParam,
  x: IParam,
  y: IParam,
  icon: IParam
) => {
  const { screens } = useScreenStore.getState();
  const screenIndex = screens.findIndex((s) => s.screenId === screenId.value);
  const screen = screens[screenIndex];
  const pixels = screen.client.pixels;
  drawLine(pixels, 0, 0, 100, 100, 1);
};
