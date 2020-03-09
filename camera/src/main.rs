use async_std::sync::channel;
use camera::Camera;
use std::time::Instant;
use async_std::println;

#[async_std::main]
async fn main() -> std::io::Result<()> {
    let (s, r) = channel(10);

    let camera = Camera::new(s);
    camera.start_camera();

    let now = Instant::now();
    for _ in 0..60 {
        let frame = r.recv().await.unwrap();
        println!("{}", frame.id).await;
    }
    println!("{}", now.elapsed().as_secs_f32()).await;

    Ok(())
}
