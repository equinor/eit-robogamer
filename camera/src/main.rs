use rscam::{Camera, Config, Frame};
use image::imageops::colorops::grayscale;
use std::time::{Duration, Instant};

fn main() {
    let mut camera = Camera::new("/dev/video0").unwrap();

    camera.start(&Config {
        interval: (1, 30),      // 30 fps.
        resolution: (1920, 1080),
        format: b"RGB3",
        ..Default::default()
    }).unwrap();

    let now = Instant::now();
    let mut duration = Duration::from_secs(0);
    for _ in 0..60 {
        let frame = camera.capture().unwrap();
        let loopnow = Instant::now();
        let image: image::ImageBuffer<image::Rgb<u8>, Frame> = image::ImageBuffer::from_raw(frame.resolution.0, frame.resolution.1, frame).unwrap();
        let _gray = grayscale(&image);
        duration += loopnow.elapsed();
    }
    println!("{}", now.elapsed().as_secs_f32());
    println!("{}", duration.as_secs_f32());
}
