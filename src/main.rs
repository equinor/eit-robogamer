#![warn(clippy::all)]
use putlebot::{camera_test, tag_test};
use async_std::println;
use clap::{App, SubCommand};

#[async_std::main]
async fn main() -> std::io::Result<()> {
    let matches = App::new("PutleBot")
        .version("0.1.0")
        .about("PulteBot")
        .subcommand(SubCommand::with_name("camera-test"))
        .subcommand(SubCommand::with_name("tag-test"))
        .get_matches();
    
    if let Some(_matches) = matches.subcommand_matches("camera-test") { 
        camera_test().await;
    } else if let Some(_matches) = matches.subcommand_matches("tag-test") { 
        tag_test().await;
    } else{
        println!("Hello world from pultebot").await;
    }
    Ok(())
}
