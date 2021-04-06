import '../scss/app.scss';
import bootstrap from 'bootstrap';
import jcanvas from 'jcanvas';
jcanvas($, window);
import CanvasController from './canvasController';
import UiController from './uiController';
import IslandController from './islandController';

const canvasController = new CanvasController();
const islandController = new IslandController(canvasController);
const uiController = new UiController(islandController, canvasController);
uiController.showDefault();