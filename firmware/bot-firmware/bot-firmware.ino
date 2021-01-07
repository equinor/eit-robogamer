#include <ESP8266WiFi.h>
#include <Servo.h>
#include <WiFiUdp.h>

// constants
const char* ssid = "Robonet";
const char* password = "Sp#z12Bd$31Ykrwdu";
const unsigned int udpPort = 4210;
const byte leftPin = 2;
const byte rightPin = 0;

//state
byte leftCurrent = 90;
byte rightCurrent = 90;
byte leftTarget = 90;
byte rightTarget = 90;
unsigned long lastMessage = 0;
int lastStatus = WL_DISCONNECTED;

//Tools and controllers.
WiFiUDP Udp;
Servo leftMotor;
Servo rightMotor;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600, SERIAL_8N1);
  Serial.println();

  WiFi.begin(ssid, password);
}

void loop() {
  unsigned long now = millis();
  
  // Handle any changes to the WiFi, this wil hopefully just reconnect when needed. 
  connectionManager();

  // Update motor speed when we get packages. 
  readFromWiFi(now);

  // Apply actions to the left and right servo.
  servoManager(now);
}

void connectionManager(){
  int status = WiFi.status();
  if( status == WL_CONNECTED ) {
    if(lastStatus == WL_CONNECTED) {
      return; // we are connected no need todo work;
    }
    //We have just come online
    Udp.begin(udpPort);
    lastStatus = status;
    Serial.println("Connected");
    return;
  }
  if(status == WL_CONNECTION_LOST) {
    //we need to reconect.
    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    lastStatus = status;
    return;
  }
  // We need to connect or reconnect
  lastStatus == status;
}

void readFromWiFi(unsigned long now) {
  int packetSize = Udp.parsePacket();
  if (packetSize)
  {
    if(packetSize != 2){
      Serial.print("Waring: expected udp package of 2 bytes found ");
      Serial.print(packetSize);
      Serial.println(" bytes. Dropping package");
    }
    leftTarget = Udp.read(); //first byte is left
    rightTarget = Udp.read(); //second byte is right
    lastMessage = now; 
  }
}

void servoManager(unsigned long now) {
  // test for out of bound;
  if (leftTarget > 180){
    Serial.print("Warning: left motor out of bound with: ");
    Serial.println(leftTarget);
    leftTarget = 180;
  }
  
  if (rightTarget > 180){
    Serial.print("Warning: right motor out of bound with: ");
    Serial.println(rightTarget);
    rightTarget = 180;
  }
  
  //Attach and detach servo as needed
  //Turn of servo if more than 250 ms since last message.
  if(now - lastMessage > 250){
    if(leftMotor.attached()){
      // left motor should be detached but its attache we need to stop this runaway robot now.
      leftMotor.detach();
      rightMotor.detach();
      Serial.println("Warning: Over 250ms since last message from server shuting down");
    }
    //Motor is off no need for any more prossesing
    return;
  }else{
    if(!leftMotor.attached()){
      // left motor should be attaced but is not need rev the engines.
      leftMotor.attach(leftPin);
      rightMotor.attach(rightPin);
      leftCurrent = 90;
      rightCurrent = 90;
      Serial.println("Starting the motores.");
    }
  }

  if(leftTarget != leftCurrent){
    leftCurrent = leftTarget;
    leftMotor.write(leftCurrent);
  }

  if(rightTarget != rightCurrent){
    rightCurrent = rightTarget;
    rightMotor.write(180 - rightCurrent);
  }
}
