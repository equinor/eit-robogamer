export default class EnginePower {
    public static readonly NoPower = new EnginePower();

    public readonly left: number; // from -1.0 to 1.0
    public readonly right: number; // from -1.0 to 1.0

    public constructor(left: number = 0, right:number = 0){
        this.left = Math.min(Math.max(left, -1), 1);
        this.right = Math.min(Math.max(right, -1), 1);
    }

    
}