use apriltag_sys::{
    apriltag_detector_create,
    apriltag_detector_destroy
};

pub fn tagtest() {
    let td = unsafe {apriltag_detector_create()};

    unsafe {apriltag_detector_destroy(td)};
}