import Box2DPhysics from './Box2DPhysics';
import Game from './Game';
import UiClient from './UiClient';

let physic = new Box2DPhysics();
let game = new Game(physic);
let uiClient = new UiClient();

game.onUpdate = uiClient.newState.bind(uiClient);