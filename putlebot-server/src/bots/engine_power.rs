#[derive(Debug, Clone, Copy)]
pub struct EnginePower{
    left: f64, // from -1.0 to 1.0
    right: f64, // from -1.0 to 1.0
}

impl EnginePower {
    pub fn new(left: f64, right: f64) -> EnginePower {
        EnginePower{
            left: left.max(-1.0).min(1.0),
            right: right.max(-1.0).min(1.0),
        }
    }

    pub fn left(self) -> f64 {
        self.left
    }

    pub fn right(self) -> f64 {
        self.right
    }
}