import { Bot } from "./state.js";

export class Socket{
    constructor(socket, state){
        this._state = state;
        this._socket = socket;

        this._socket.on('bot', this.onBot.bind(this))
    }

    onBot(p){
        let self = this;
        this._state.home = p.h.map(self.toBot);
        this._state.away = p.a.map(self.toBot);
    }

    toBot(b){
        let bot = new Bot();
        bot.x = b.x;
        bot.y = b.y;
        bot.angle = b.a;
        return bot;
    }
}