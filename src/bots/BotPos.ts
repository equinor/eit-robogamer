import Angle from "../models/Angle";
import Point from "../models/Point";

export default class BotPos extends Point {
    public readonly point: Point; //from x 0.0 to 16.0, y 0.0 to 9.0
    public readonly angle: Angle; // radians

    constructor(point = Point.Origin, angle = Angle.Zero){
        super(point.x, point.y);
        this.point = point;
        this.angle = angle;
    }

    get radians() {
        return this.angle.radians
    }

    get degrees() {
        return this.angle.degrees
    }
}
