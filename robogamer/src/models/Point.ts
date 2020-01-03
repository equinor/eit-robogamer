import Angle from "./Angle";

export default class Point{
    constructor(
        public readonly x:number,
        public readonly y:number,
    ){}

    public sub(other:Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    public distance(): number {
        return Math.sqrt((this.x*this.x) + (this.y * this.y))
    }

    public asAngle(): Angle {
        return new Angle(Math.atan2(this.y, this.x)+ Math.PI);
    }

    public toString(): string {
        return `(${this.x},${this.y})`
    }

    public static readonly Origin: Point = new Point(0,0);
}