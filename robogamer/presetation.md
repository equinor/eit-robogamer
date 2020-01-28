# Robot Hack
## Where software meet hardware.

---
# I just want to get started.
```bash
git clone https://github.com/equinor/robogamer
npm install
npm start
```
This will open the simulator locally just go to http://localhost:8080 and enjoy.

---
# Background
* At SI sector gathering we had a ROS drone competition
* It was close source so we wanted to start our own.
* This time real and open source.
---
# Ideas for this hackathon
* Bot calibration.
* Better / faster tracking.
* Create games using simulator.
* Anything else you want todo with 8 minion bots.

---
# The hardware
* [Wemos D1 R2](https://wiki.wemos.cc/products:d1:d1)
* Based on the [ESP8266WiFi](https://arduino-esp8266.readthedocs.io/en/2.5.2/esp8266wifi/readme.html) wifi controller.
* Its Arduino compatible.
* Cheap and dumb by design motors. [Ali express link](https://www.aliexpress.com/item/32815895941.html) 

---
* The network
* Every bot have an small hidden number on top. That is id. That is returned by tracking.
* Etch bot have an static ip that is 172.27.44.id.
* To make the bot move you send a udp package to port 4321 with 2 bytes. First byte is left engine, Second is the right one.
* Range 0-180. Numbers from 181-255 is safe but is ignored.
* The bot will stop of its over 250ms since last message so spam a way.

---
# Tracking
* We use [ArUco](https://www.uco.es/investiga/grupos/ava/node/26) for tracking.
    * Its a plugin to OpenCV
* Seperate python prosess. cameraserver\marker_manager\scaner.py
* Gives a 0-9/0-16 position of etch tracker with id and angle.
* The Typescript part of network and traking is in src\bots\RealBots.ts file.

---
# Game Engine

* Have an interface for the fake and real bot runner.
* Talks to the ui using socket.io .
* Very simplistic right now. Not realy a game.
* Fake bots uses a Box2D port for JS.

---
# Virtual Lab
* If you don't fell like installing stuff locally.
* Talk to me to get access to a virtual lab that run VSCode and everything in chrome. Fully compatible with Equinor computers.
* Feel free to install node and git locally.
* Python is only need for real run.

