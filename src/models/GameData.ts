import Wall from "./Wall";
import Target from "./Target";

export default class GameDate {
    public constructor(
        public readonly redName: string,
        public readonly blueName: string,
        public readonly walls: readonly Wall[],
        public readonly targets: readonly Target[],
    ){}
}