import './render.js'
import { State, Bot } from './state.js';
import { Render } from './render.js';

function botgen(){
    let bot = new Bot();
    bot.x = Math.random() * 16;
    bot.y = Math.random() * 9;
    bot.angle = Math.random() * Math.PI * 2;

    return bot;
}

let state = new State();
state.home = [botgen(), botgen(), botgen(), botgen()];
state.away = [botgen(), botgen(), botgen(), botgen()];

let render = new Render(state);

var socket = io();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);