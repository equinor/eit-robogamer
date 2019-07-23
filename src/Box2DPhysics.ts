import { BotPhysics, EnginePower, PositionCallback, BotPos  } from "./BotPhysics";
import { World, Vec2, Edge, Box, Body } from "planck-js";

interface Bot {
    power: EnginePower,
    body: Body,
}

export class Box2DPhysics extends BotPhysics{
    static readonly stepTime = 1/60;

    private world: World;
    private bots: Bot[];

    constructor(onUpdate: PositionCallback, bots: BotPos[]){
        super(onUpdate);

        this.world = new World({
            gravity: Vec2(0, 0)
        });
        this.setupWalls();

        let pos = [Vec2(0,0), Vec2(1,0), Vec2(1,1), Vec2(1,-1), Vec2(-1,0), Vec2(-1,1), Vec2(-1,-1), Vec2(2,0)]
        this.bots = bots.map((b) => this.createBot(b));

        setInterval(this.step, Box2DPhysics.stepTime* 1000);
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
            shape: Box(60/90/2, 70 / 90/2),
            density: 1,
            friction: 3,
        });

        return {
            power: {
                left: 0,
                right: 0,
            },
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
                body.getWorldPoint(Vec2(0, 0.5)),
                true
            )

            body.applyLinearImpulse(
                body.getWorldVector(Vec2(right, 0)),
                body.getWorldPoint(Vec2(0, -0.5)),
                true
            )
        }
        this.world.step(Box2DPhysics.stepTime);
        this.onUpdate(this.bots.map(botToPos));
    }
}

function botToPos(bot: Bot): BotPos {
    var pos = bot.body.getPosition();
    var angle = bot.body.getAngle();
    return {
        x: pos.x + 8,
        y: pos.y + 4.5,
        angle: angle,
    }
}