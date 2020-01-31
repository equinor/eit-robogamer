#[derive(Debug, Clone, Copy)]
pub enum Mode{
    Sim,
    Real,
}

#[derive(Debug, Clone, Copy)]
pub enum Team {
    Center
}

#[derive(Debug, Clone, Copy)]
pub struct Option {
    pub red: Team,
    pub blue: Team,
    pub mode: Mode, 
}

impl Default for Option {
    fn default() -> Option {
        Option {
            red: Team::Center,
            blue: Team::Center,
            mode: Mode:Sim
        }
    }
}
