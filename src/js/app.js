import '../scss/app.scss';
import bootstrap from 'bootstrap';
import jcanvas from 'jcanvas';
jcanvas($, window);
import CanvasController from './canvasController';
import MenuController from './menuController';
import IslandController from './islandController';

const canvasController = new CanvasController();
const islandController = new IslandController(canvasController);
const menuController = new MenuController(islandController);
menuController.showDefault();