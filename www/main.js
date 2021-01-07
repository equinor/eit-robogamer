import './render.js'
import { State, Bot } from './state.js';
import { Render } from './render.js';
import { Socket } from './socket.js';

function botgen(){
    let bot = new Bot();
    bot.x = Math.random() * 16;
    bot.y = Math.random() * 9;
    bot.angle = Math.random() * Math.PI * 2;

    return bot;
}

let state = new State();

let render = new Render(state, document.getElementById('bots'));
let socket = new Socket(io(), state);