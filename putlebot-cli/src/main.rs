#![warn(clippy::all)]

use clap::{App};
use putlebot_server::{
    Config, putlebot_start};

fn main() {
    let _matches = App::new("PutleBot")
        .version("0.0.0")
        .about("Pultebot Cli interface")
        .get_matches();
    
    println!("Starting server");
    putlebot_start(Config{});
}
