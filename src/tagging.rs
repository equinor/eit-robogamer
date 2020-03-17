use apriltag_sys::*;
use std::ffi::CString;


pub fn tagtest() {
    unsafe {
        let file = CString::new("test.pnm").expect("CString::new failed");
        let im = image_u8_create_from_pnm(file.as_ptr());
        let td = apriltag_detector_create();
        let tf = tag36h11_create();
        apriltag_detector_add_family_bits(td, tf, 1);
        let detections = apriltag_detector_detect(td, im);
        
        println!("Number of decetions: {}", &mut (*detections).size);

        // Cleanup.
        tag36h11_destroy(tf);
        apriltag_detector_destroy(td);
    }
}