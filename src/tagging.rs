use apriltag_sys::*;
use std::slice;

use crate::models::{Detection, Frame};

pub struct AprilTag {
    td: *mut apriltag_detector,
    tf: *mut apriltag_family,
}

impl AprilTag {
    pub fn new() -> AprilTag{
        let td = unsafe{ apriltag_detector_create() };
        let tf = unsafe{ tag36h11_create()};
        unsafe {apriltag_detector_add_family_bits(td, tf, 1)};
        AprilTag{td,tf}
    }

    pub fn enable_debug(&mut self, debug: bool) {
        unsafe { (*self.td).debug = debug as i32 };
    }

    pub fn detect(&mut self, frame: &Frame) -> Vec<Detection> {
        unsafe {
            let mut im = image_u8{
                width: frame.image.width() as i32,
                height: frame.image.height() as i32,
                stride: frame.image.width() as i32,
                buf: frame.image.as_ptr() as *mut u8
            };
            let april_detections = apriltag_detector_detect(self.td, &mut im);

            let data:*const *const apriltag_detection = (*april_detections).data.cast();
            let data = slice::from_raw_parts(data, (*april_detections).size as usize);

            let  mut detections = Vec::new();
            for d in data {
                detections.push(Detection{
                    id: (**d).id as u32,
                    center: (**d).c,
                    corners: (**d).p
                });
            }

            apriltag_detections_destroy(april_detections);

            detections
        }
    }
}

impl Default for AprilTag{
    fn default() -> Self {
        AprilTag::new()
    }
}

impl Drop for AprilTag{
    fn drop(&mut self) {
        unsafe {
            tag36h11_destroy(self.tf);
            apriltag_detector_destroy(self.td);
        }
    }
}