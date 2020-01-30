#![warn(clippy::all)]

use tokio::runtime::Runtime;
use warp::Filter;

pub struct Config {

}

pub fn putlebot_start(config: Config){
    let mut rt = Runtime::new().unwrap();
    rt.block_on(putlebot_start_async(config));
}

async fn putlebot_start_async(_config: Config) {
    // GET /hello/warp => 200 OK with body "Hello, warp!"
    let hello = warp::path!("hello" / String)
    .map(|name| format!("Hello, {}!", name));

    warp::serve(hello)
    .run(([127, 0, 0, 1], 3030))
    .await;
}