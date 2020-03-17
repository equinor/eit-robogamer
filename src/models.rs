use image::{
    io::Reader,
    ImageBuffer,
    Luma,
    imageops::colorops::grayscale
};
use std::{
    time::Instant
};

pub struct Frame {
    pub camera: u8,
    pub id: u64,
    pub instant: Instant,
    pub image: ImageBuffer<Luma<u8>, Vec<u8>>,
}

impl Frame {
    pub fn from_file(path: &str) -> Frame {
        let img = Reader::open(path).unwrap().decode().unwrap();

        Frame {
            camera: 0,
            id: 0,
            instant: Instant::now(),
            image: grayscale(&img)
        }
    }
}

#[derive(Debug)]
pub struct Detection {
    pub id: u32,
    pub center: [f64; 2],
    pub corners: [[f64; 2]; 4]
}