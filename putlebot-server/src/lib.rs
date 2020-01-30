#![warn(clippy::all)]

// Porting js code so will allow dead code for now.
#![allow(dead_code)]

mod models;

use tokio::runtime::Runtime;
use futures::{FutureExt, StreamExt};
use warp::Filter;


pub fn putlebot_start(){
    let mut rt = Runtime::new().unwrap();
    rt.block_on(putlebot_start_async());
}

async fn putlebot_start_async() {
    let www = warp::fs::dir("www");

    let socket = warp::path("socket")
        .and(warp::ws())
        .map(|ws: warp::ws::Ws| {
            ws.on_upgrade(|websocket| {
                // Just echo all messages back...
                let (tx, rx) = websocket.split();
                rx.forward(tx).map(|result| {
                    if let Err(e) = result {
                        eprintln!("websocket error: {:?}", e);
                    }
                })
            })
        });

    let routes = socket.or(www);

    warp::serve(routes)
    .run(([127, 0, 0, 1], 3030))
    .await;
}