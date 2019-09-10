export default class BotPos {
    public readonly x: number; //from 0.0 to 16.0
    public readonly y: number; //from 0.0 to 9.0
    public readonly angle: number; // radians
    // @ts-ignore unused private var to stop duck typing of class
    private readonly _noDuckType: null;

    constructor(x = 0,y = 0, angle = 0){
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}
