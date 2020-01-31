#[derive(Debug, Clone, Copy)]
pub struct Angle(f64);

use crate::models::point::Point;
use std::f64::consts::PI;

impl Angle {
    pub const ZERO: Angle = Angle(0.0);

    pub fn from_radians(radians: f64) -> Angle {
        let mut r = radians;
        while r < 0.0 {
            r += PI * 2.0;
        };
        
        while r > PI * 2.0 {
            r -= PI * 2.0;
        };

        Angle(r)
    }

    pub fn from_degrees(degrees: f64) -> Angle {
        Angle::from_radians(degrees.to_radians())
    }

    pub fn from_point(point: Point) -> Angle {
        Angle::from_radians(point.y().atan2(point.x()) + PI)
    }

    pub fn radians(self) -> f64 {
        self.0
    }

    pub fn degrees(self) -> f64 {
        self.0.to_degrees()
    }

    pub fn right(self) -> f64 {
        (self.0 / PI) - 1.0
    }
    pub fn sub(self, other:Angle) -> Angle {
        Self::from_radians(self.0 - other.0)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use test_case::test_case;
    use assert_approx_eq::assert_approx_eq;

    impl Angle {
        fn rounded(self) -> u32 {
            self.degrees().round() as u32
        }
    }

    #[test_case( 0.0 => 0)]
    #[test_case( PI * 0.5 => 90)]
    #[test_case( PI => 180)]
    #[test_case( PI * 1.5 => 270)]
    #[test_case( PI * 2.0 => 360)]
    fn degrees(radians: f64) -> u32 {
        Angle::from_radians(radians).rounded()
    }

    #[test_case( 0.0, 0.0)]
    #[test_case( 90.0, PI * 0.5)]
    #[test_case( 180.0, PI)]
    #[test_case( 270.0, PI * 1.5)]
    #[test_case( 360.0, PI * 2.0)]
    fn radians(degrees: f64, radians: f64) {
        assert_approx_eq!(Angle::from_degrees(degrees).radians(), radians);
    }

    #[test_case( 0.0, 0.0 => 180)]
    #[test_case( 1.0, 0.0 => 180)]
    #[test_case( 1.0, 1.0 => 225)]
    #[test_case( 0.0, 1.0 => 270)]
    #[test_case( -1.0, 1.0 => 315)]
    #[test_case( -1.0, 0.0 => 360)]
    #[test_case( -1.0, -1.0 => 45)]
    #[test_case( 0.0, -1.0 => 90)]
    #[test_case( 1.0, -1.0 => 135)]
    fn point(x: f64, y: f64) -> u32 {
        Angle::from_point(Point::new(x,y)).rounded()
    }
   
    #[test_case( -90.0 => 270)]
    #[test_case( -180.0 => 180)]
    #[test_case( -10_000.0 => 80)]
    #[test_case( 360.0 + 90.0 => 90)]
    #[test_case( 360.0 + 180.0 => 180)]
    #[test_case( 10_000.0 => 280)]
    fn range(degrees: f64) -> u32{
        Angle::from_degrees(degrees).rounded()
    }

    #[test_case( 180.0, 90.0 => 90)]
    #[test_case( 300.0, 100.0 => 200)]
    #[test_case( 0.0, 90.0 => 270)]
    #[test_case( 0.0, 360.0 => 0)]
    #[test_case( 10.0, 80.0 => 290)]
    fn sub(a: f64, b: f64) -> u32 {
        Angle::from_degrees(a).sub(Angle::from_degrees(b)).rounded()
    }

    #[test_case( 0.0, -1.0)]
    #[test_case( 90.0, -0.5)]
    #[test_case( 180.0, 0.0)]
    #[test_case( 270.0, 0.5)]
    fn right(degrees: f64, result: f64){
        assert_approx_eq!(Angle::from_degrees(degrees).right(), result);
    }
}