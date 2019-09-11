export default class Angle{
    public constructor(public readonly radians: number) {
        while(this.radians < 0){
            this.radians += Math.PI*2;
        }
        
        while(this.radians > Math.PI*2){
            this.radians -= Math.PI*2;
        }
    }

    public static fromDegrees(degrees: number): Angle {
        return new Angle(degrees / 180 * Math.PI);
    }

    public get degrees(): number {
        return this.radians * 180 / Math.PI
    }

    public get right(): number {
        return ((this.radians / Math.PI) -1)
    }
    public sub(other:Angle): Angle {
        return new Angle(this.radians - other.radians);
    }

    public toString(): string {
        return `${this.degrees}°`;
    }

    public static readonly Zero: Angle = new Angle(0);
}