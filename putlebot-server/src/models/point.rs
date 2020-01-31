#[derive(Debug, Clone, Copy)]
pub struct Point{
    x: f64,
    y: f64,
}

impl Point {
    pub const ORIGIN:Point = Point{x:0.0,y:0.0};

    pub fn new(x: f64, y: f64) -> Point {
        Point{x,y}
    }

    pub fn x(self) -> f64 {
        self.x
    }

    pub fn y(self) -> f64 {
        self.y
    }

    pub fn sub(self, other: Point) -> Point {
        Point{
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }

    pub fn distance(self) -> f64 {
        ((self.x * self.x) +  (self.y * self.y)).sqrt()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use test_case::test_case;
    use assert_approx_eq::assert_approx_eq;

    #[test_case( Point::new(0.0,0.0), Point::new(0.0, 0.0), Point::new(0.0,0.0))]
    #[test_case( Point::new(4.0,3.0), Point::new(2.0, 3.0), Point::new(2.0,0.0))]
    #[test_case( Point::new(1.0,2.0), Point::new(4.0, 3.0), Point::new(-3.0,-1.0))]
    #[test_case( Point::new(1.0,2.0), Point::new(4.0, 1.0), Point::new(-3.0,1.0))]
    fn sub(a:Point, b:Point, r:Point) {
        let result = a.sub(b);
        assert_approx_eq!(result.x(),r.x());
        assert_approx_eq!(result.y(),r.y());
    }

    #[test_case( Point::new(0.0,0.0), 0.0)]
    #[test_case( Point::new(1.0,1.0), 1.41)]
    #[test_case( Point::new(1.0,2.0), 2.236)]
    #[test_case( Point::new(2.0,2.0), 2.828)]
    fn distance(a: Point, r: f64) {
        assert_approx_eq!(a.distance(),r,0.01);
    }
}