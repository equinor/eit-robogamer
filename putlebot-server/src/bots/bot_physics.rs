use crate::bots::engine_power::EnginePower;
use futures::Sink;
use crate::bots::bot_pos::BotPos;

pub trait BotPhysics {
    fn start(on_update: dyn Sink<Vec<BotPos>, Error = ()>,  initial_position: &[BotPos]);
    fn set_power(power: &[EnginePower]);
}