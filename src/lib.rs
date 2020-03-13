#![warn(clippy::all)]
pub mod camera;
pub mod tagging;

use async_std::sync::channel;
use std::time::Instant;
use async_std::println;

pub async fn camera_test() {
    let (s, r) = channel(10);

    camera::start(s);

    let now = Instant::now();
    for _ in 0..60 {
        let frame = r.recv().await.unwrap();
        println!("{} lag: {:?}", frame.id, frame.instant.elapsed()).await;
    }
    println!("{}", now.elapsed().as_secs_f32()).await;
}

pub fn tag_test() {
    tagging::tagtest();
}