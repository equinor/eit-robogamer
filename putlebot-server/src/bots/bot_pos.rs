use crate::models::angle::Angle;
use crate::models::point::Point;

#[derive(Debug, Clone, Copy)]
pub struct BotPos {
    point: Point,
    angle: Angle,
}

impl BotPos {
    pub fn new(point: Point, angle: Angle ) -> BotPos{
        BotPos{point, angle}
    }

    pub fn point(self) -> Point {
        self.point
    }

    pub fn angle(self) -> Angle {
        self.angle
    }

    pub fn x(self) -> f64 {
        self.point.x()
    }

    pub fn y(self) -> f64 {
        self.point.y()
    }

    pub fn radians(self) -> f64 {
        self.angle.radians()
    }

    pub fn degrees(self) -> f64 {
        self.angle.degrees()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use assert_approx_eq::assert_approx_eq;

    #[test]
    fn x() {
        let bp = BotPos::new(Point::new(1.0,2.0), Angle::from_radians(3.0));
        assert_approx_eq!(bp.x(), 1.0);
    }

    #[test]
    fn y() {
        let bp = BotPos::new(Point::new(1.0,2.0), Angle::from_radians(3.0));
        assert_approx_eq!(bp.y(), 2.0);
    }

    #[test]
    fn radians() {
        let bp = BotPos::new(Point::new(1.0,2.0), Angle::from_radians(3.0));
        assert_approx_eq!(bp.radians(), 3.0);
    }
}