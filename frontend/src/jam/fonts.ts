import { getFontList, loadFont } from 'api/http/fonts';
import { makeQuerablePromise } from 'api/http/promiseHandling';
import { ENV } from 'constants/env';
import { IParam } from 'functions/tasks';
import { useFontStore } from 'stores/useFontStore';
import { ITask } from 'stores/useTaskStore';

export const _addFont = async (
  task: ITask,
  name: IParam,
  path: IParam,
  promise: IParam
) => {
  const { fonts, setFonts } = useFontStore.getState();
  const fontFace = await loadFont(name.value as string, String(path.value));
  task.promise[promise.value] = makeQuerablePromise(fontFace.load());
  task.promise[promise.value].then((result: any) => {
    const name = result.family.trim();
    const canvas: any = document.getElementById('canvas_shadow');
    const ctx = canvas?.getContext('2d');
    const metrics: any = {};
    if (ctx) {
      let s = 4;
      for (let i = 0; i < 10; i++) {
        s = s + 2;
        ctx.font = `${s}px ${name}`;
        const measure = ctx.measureText(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
        );
        if (result.family === 'Arial' && s == 8) {
          //console.log(measure);
        }
        if (result.family === 'Arial' && s == 10) {
          //console.log(measure);
        }
        metrics[s] = {
          top: measure.actualBoundingBoxAscent,
          height: Math.floor(
            measure.actualBoundingBoxAscent + measure.hangingBaseline
          ),
        };
      }
    }
    const duplicate = fonts.find((o) => o.name === name);
    if (!duplicate) {
      fonts[name] = metrics;
    }
    setFonts(fonts);
  });
};

export const _loadFontList = (task: ITask, promise: IParam, fonts: IParam) => {
  const p = getFontList();
  p.then((result) => {
    result.push({
      name: 'Arial',
      path: '',
      style: 'regular',
    });
    task.var[fonts.id] = result;
  });
  task.promise[promise.value] = makeQuerablePromise(p);
};
