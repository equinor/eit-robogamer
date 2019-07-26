import './state.js';
import { boardWidth, botHeight, botWidth } from './sizes.js';

export class Render{
    /**
     * @param {State} state
     * @param {HTMLCanvasElement} canvas
     */
    constructor(state, canvas){
        this._state = state;
        this._canvas = canvas;
        this._ctx = this._canvas.getContext('2d');

        let self = this;
        function step(_) {
            self.render()
            window.requestAnimationFrame(step);
        }
        
        window.requestAnimationFrame(step);
    }

    render(){
        let self = this;
        this.clear();
        this._canvas.width = this._canvas.offsetWidth;
        this._canvas.height = this._canvas.offsetHeight;
        this._state.home.forEach(bot => self.renderBot(bot, "lightblue"));
        this._state.away.forEach(bot => self.renderBot(bot, "red"));
    }

    clear(){
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }

    renderBot(bot, color){
        const pxPerUnit = this._canvas.width / boardWidth;

        let x = bot.x * pxPerUnit;
        let y = bot.y * pxPerUnit;
        const h = botHeight * pxPerUnit;
        const w = botWidth * pxPerUnit;

        this._ctx.translate(x,y);
        this._ctx.fillStyle = color;
        this._ctx.beginPath();
        this._ctx.rotate(bot.angle - (Math.PI /2));
        this._ctx.rect(-(w/2), -(h/2), w, h);
        this._ctx.fill();

        this._ctx.strokeStyle = "black";
        this._ctx.lineWidth = 2;
        this._ctx.beginPath();
        this._ctx.moveTo(-5,-15);
        this._ctx.lineTo(0,10);
        this._ctx.lineTo(5,-15);
        this._ctx.stroke();

        //reset back to default.
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}