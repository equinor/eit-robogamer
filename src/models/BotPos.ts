export default class BotPos {
    public readonly x: number; //from 0.0 to 16.0
    public readonly y: number; //from 0.0 to 9.0
    public readonly angle: number; // radians

    constructor(x = 0,y = 0, angle = 0){
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}
