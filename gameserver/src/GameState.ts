import Bot, { BotView } from "./Bot";

export class GameState {
    public bots: Bot[] = []
}

export class GameStateView {
    public readonly bots: readonly BotView[];
    
    public constructor(state: GameState){
        this.bots = state.bots.map((b)=> new BotView(b) );
    }
}