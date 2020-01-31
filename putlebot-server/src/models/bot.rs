use crate::bots::bot_pos::BotPos;
use crate::bots::engine_power::EnginePower;
use crate::models::point::Point;
use crate::models::angle::Angle;
use std::f64::consts::PI;

#[derive(Debug, Clone, Copy)]
pub enum Action {
    GoTo(Point),
    TurnTo(Point),
    Power(EnginePower),
    Idle
}

#[derive(Debug, Clone, Copy)]
pub struct Bot{
    pos: BotPos,
    action: Action
}

impl Bot{
    pub fn new(pos: BotPos) -> Bot {
        Bot {
            pos,
            action: Action::Idle
        }
    }

    pub fn set_pos(self, pos: BotPos) -> Bot {
        Bot {
            pos,
            action: self.action
        }
    }

    pub fn power(self) -> EnginePower {
        match self.action {
            Action::GoTo(p) => self.go_to_calc(p),
            Action::TurnTo(p) => self.turn_to_calc(p),
            Action::Power(p) => p,
            Action::Idle => EnginePower::IDLE
        }
    }

    pub fn set_power(self, power: EnginePower) -> Bot {
        Bot{
            pos: self.pos,
            action: Action::Power(power),
        }
    }

    pub fn go_to(self, target: Point) -> Bot {
        Bot{
            pos: self.pos,
            action: Action::GoTo(target)
        }
    }

    pub fn turn_to(self, target: Point) -> Bot {
        Bot{
            pos: self.pos,
            action: Action::TurnTo(target)
        }
    }
    
    pub fn stop(self) -> Bot {
        Bot{
            pos: self.pos,
            action: Action::Idle
        }
    }

    fn go_to_calc(self, target: Point) -> EnginePower {
        let delta = target.sub(self.pos.point());
        let offset = Angle::from_point(delta).sub(self.pos.angle()).right() * 0.5;
        let mut right = 0.5;
        let mut left = 0.5;
        if offset > 0.0 {
            left = -offset / PI
        }
        if offset < 0.0  {
            right = offset / PI
        }
        let max_power = delta.distance().min(1.0);
        
        EnginePower::new(left * max_power, right * max_power)
    }

    fn turn_to_calc(self, target: Point) -> EnginePower {
        let target = Angle::from_point(target.sub(self.pos.point()));
        let right = target.sub(self.pos.angle()).right() * 0.5;
        EnginePower::new(-right, right)
    }
}