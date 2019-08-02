// Quick test of driving servos
// Need to add code to compensate for variances between servos (e.g. zero point slightly different).

#include "Servo.h"

Servo leftMotor;
Servo rightMotor;

uint8_t currentSpeed = 90;

void setup() {
  leftMotor.attach(2);
  rightMotor.attach(0);

  currentSpeed = accelerate(currentSpeed, 180);

}

void loop() {
  currentSpeed = deaccelerate(currentSpeed, 0);
  currentSpeed = accelerate(currentSpeed, 180);
}

void drive(uint8_t acceleration, uint8_t steering) {

}

uint8_t accelerate(uint8_t fromAcceleration, uint8_t toAcceleration) {
  uint8_t acc = fromAcceleration;
  for (uint8_t acc = fromAcceleration; acc < toAcceleration; acc++) {
    leftMotor.write(acc);
    rightMotor.write(180 - acc);
    currentSpeed = acc;
    delay(50);
  }
  return currentSpeed;
}

uint8_t deaccelerate(uint8_t fromAcceleration, uint8_t toAcceleration) {
  uint8_t acc = fromAcceleration;
  for (uint8_t acc = fromAcceleration; acc > toAcceleration; acc--) {
    leftMotor.write(acc);
    rightMotor.write(180 - acc);
    currentSpeed = acc;
    delay(50);
  }
  return currentSpeed;
} 
