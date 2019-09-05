import State from "./State";

export default interface ITeamClient{
    start(): void;
    update(state: State): void;
}