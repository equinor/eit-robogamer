#![warn(clippy::all)]
pub mod camera;

use async_std::sync::channel;
use std::time::Instant;
use async_std::println;

pub async fn camera_test() {
    let (s, r) = channel(10);

    camera::start(s);

    let now = Instant::now();
    for _ in 0..60 {
        let frame = r.recv().await.unwrap();
        println!("{}", frame.id).await;
    }
    println!("{}", now.elapsed().as_secs_f32()).await;
}