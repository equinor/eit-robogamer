#![warn(clippy::all)]
pub mod camera;
pub mod tagging;
pub mod models;

use async_std::sync::channel;
use std::time::Instant;
use async_std::println;

use tagging::AprilTag;
use models::Frame;

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

pub async fn tag_test() {
    let mut april = AprilTag::new();

    let frame = Frame::from_file("test2.png");

    println!("Detections found:  {:?}", april.detect(&frame)).await;
}