import IBotPhysics, {IPositionCallback} from "./IBotPhysics";
import { World, Vec2, Edge, Body, Circle } from "planck-js";
import BotPos from "./BotPos";
import EnginePower from "./EnginePower";

interface Bot {
    power: EnginePower,
    body: Body,
}

export default class FakeBots implements IBotPhysics{
    static readonly stepTime = 1/60;

    private world: World;
    private bots: Bot[] = [];
    private _onUpdate: IPositionCallback = () => {}

    constructor(){
        this.world = new World({
            gravity: Vec2(0, 0)
        });
        this.setupWalls();
    }

    public start(onUpdate: IPositionCallback, initialPosition: readonly BotPos[]){
        this._onUpdate = onUpdate;
        this.bots = initialPosition.map((b) => this.createBot(b));

        setInterval(this.step, FakeBots.stepTime* 1000);
    }

    public setPower(power: EnginePower[]): void {
        const length = Math.min(power.length, this.bots.length);
        for (let i = 0; i < length; i += 1) {
            this.bots[i].power = power[i];
        }
    }

    private setupWalls() {
        var ground = this.world.createBody(Vec2(0.0, 0.0));
        // Left vertical
        ground.createFixture(Edge(Vec2(-8, -4.5), Vec2(-8, 4.5)));
        // Right vertical
        ground.createFixture(Edge(Vec2(8, -4.5), Vec2(8, 4.5)));
        // Top horizontal
        ground.createFixture(Edge(Vec2(-8, 4.5), Vec2(8, 4.5)));
        // Bottom horizontal
        ground.createFixture(Edge(Vec2(-8, -4.5), Vec2(8, -4.5)));
    }

    private createBot(botPos: BotPos):Bot {
        let pos = Vec2(botPos.x - 8, botPos.y - 4.5);
        let bot = this.world.createBody({
            type: 'dynamic',
            position: pos,
            angle: botPos.angle,
            linearDamping: 10,
            angularDamping: 10,
        })

        bot.createFixture({
            shape: Circle(42 / 90),
            density: 1,
            friction: 3,
        });

        return {
            power: EnginePower.NoPower,
            body: bot
        }
    }

    private step = () => {
        for (const bot of this.bots) {
            let left = bot.power.left * 0.195;
            let right = bot.power.right * 0.195;
            let body = bot.body;

            body.applyLinearImpulse(
                body.getWorldVector(Vec2(left, 0)),
                body.getWorldPoint(Vec2(0, 42 / 90)),
                true
            )

            body.applyLinearImpulse(
                body.getWorldVector(Vec2(right, 0)),
                body.getWorldPoint(Vec2(0, -42 / 90)),
                true
            )
        }
        this.world.step(FakeBots.stepTime);
        this._onUpdate(this.bots.map(botToPos));
    }
}

function botToPos(bot: Bot): BotPos {
    var pos = bot.body.getPosition();
    var angle = bot.body.getAngle();
    return new BotPos(pos.x + 8, pos.y + 4.5, angle);
}