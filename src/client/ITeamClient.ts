import State from "./State";

export default interface ITeamClient{
    start(state: State): void;
    update(state: State): void;
}