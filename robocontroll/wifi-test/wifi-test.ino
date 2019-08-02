#include <ESP8266WiFi.h>
#include <WiFiUdp.h>



void setup() {
  Serial.begin(9600, SERIAL_8N1);

  WiFi.begin("network", "password");

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());

  pinMode(2, OUTPUT);

  
}

// the loop function runs over and over again forever
void loop() {
  
}
