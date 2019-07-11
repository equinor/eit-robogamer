import './state.js';

export class Render{
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
        this._state.home.forEach(bot => self.renderBot(bot, "lightblue"));
        this._state.away.forEach(bot => self.renderBot(bot, "red"));
    }

    clear(){
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }

    renderBot(bot, color){
        let x = bot.x / 16 * this._canvas.width;
        let y = bot.y / 9 * this._canvas.height;


        this._ctx.translate(x,y);
        this._ctx.fillStyle = color;
        this._ctx.beginPath();
        this._ctx.arc(0, 0, 20, 0, 2 * Math.PI);
        this._ctx.fill();

        this._ctx.strokeStyle = "black";
        this._ctx.lineWidth = 2;
        this._ctx.rotate(bot.angle);
        this._ctx.beginPath();
        this._ctx.moveTo(-5,-15);
        this._ctx.lineTo(0,10);
        this._ctx.lineTo(5,-15);
        this._ctx.stroke();

        //reset back to default.
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}