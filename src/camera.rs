use async_std::{
    task,
    sync::Sender
};
use std::{
    time::Instant
};
use image::imageops::colorops::grayscale;
use crate::models::Frame;

pub fn start(sender:Sender<Frame>) {
    task::spawn(async move {
        let mut camera = rscam::Camera::new("/dev/video0").unwrap();
        let camera_id = 0;

        camera.start(&rscam::Config {
            interval: (1, 30),      // 30 fps.
            resolution: (1920, 1080),
            format: b"RGB3",
            ..Default::default()
        }).unwrap();

        let mut index = 0;
        loop {
            let frame = camera.capture().unwrap();
            let now = Instant::now();
            let image: image::ImageBuffer<image::Rgb<u8>, rscam::Frame> = image::ImageBuffer::from_raw(frame.resolution.0, frame.resolution.1, frame).unwrap();
            let gray = grayscale(&image);
            let frame = Frame {
                camera: camera_id,
                id: index,
                instant: now,
                image: gray
            };

            sender.send(frame).await;
            index += 1;
        }
    });
}