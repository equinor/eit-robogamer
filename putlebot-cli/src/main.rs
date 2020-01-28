#![warn(clippy::all)]

use clap::{App};

fn main() {
    let _matches = App::new("PutleBot")
        .version("0.0.0")
        .about("Pultebot Cli interface")
        .get_matches();
    
    println!("Hello from pultebot");
}
