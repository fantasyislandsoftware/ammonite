import { windowDefault } from '../../Objects/UIWindow/_props/windowDefault';
import {
  IWindow,
  IWindowClient,
  IWindowTitleBar,
} from '../../Objects/UIWindow/_props/windowInterface';
import { useScreenStore } from '../../stores/useScreenStore';
import { v4 as uuidv4 } from 'uuid';
import { screenContainerRender } from '../../Objects/UIScreen/container/screenContainerRender';
import { initPixelArray } from 'api/lib/graphics/pixelArray';
import { WindowColour } from 'Objects/UIWindow/_props/windowColour';
import { measureText } from 'api/lib/graphics/text';
import { EnumButtonType } from 'Objects/UIButton/props/buttonInterface';
import { generateBarIcons } from 'Objects/UIButton/props/buttonFunc';
import { WINDOW_API } from './api/window';
import { SCREEN_API } from './api/screen';

