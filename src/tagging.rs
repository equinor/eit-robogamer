use apriltag_sys::*;
use std::ffi::CString;

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

    pub fn detect(&mut self) -> i32 {
        unsafe {
            let file = CString::new("test2.pnm").expect("CString::new failed");
            let im = image_u8_create_from_pnm(file.as_ptr());
            let detections = apriltag_detector_detect(self.td, im);
            
            (*detections).size
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