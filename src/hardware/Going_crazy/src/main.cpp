#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>

#include <ArduinoJson.h>

const char *ssid = "Inteli-welcome";
const char *password = "";

String serverName = "http://10.128.1.200:3000/test_device";
String request;

AsyncWebServer localServer(80);

int scanTime = 5; // In seconds
BLEScan *pBLEScan;

String json, json_buffer = "";
DynamicJsonDocument doc(2048);
int counter = 0;

class MyAdvertisedDeviceCallbacks : public BLEAdvertisedDeviceCallbacks
{
  void onResult(BLEAdvertisedDevice advertisedDevice)
  {
    Serial.printf("Advertised Device: %s \n", advertisedDevice.getAddress().toString().c_str());
    doc[String(counter)] = advertisedDevice.getAddress().toString();
    // String text = "\"" + String(counter) + "\": \"" + advertisedDevice.getAddress().toString().c_str() + "\", \n";
    // json.concat(text);
    counter += 1;
  }
};

void setup()
{
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting...");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  localServer.on("/list_devices", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
    if(WiFi.status() == WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      http.begin(client, serverName);

      //http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(json);

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
          
      // Free resources
      http.end();

    }
    request->send(200, "application/json", json); });

  localServer.begin();

  BLEDevice::init("");
  pBLEScan = BLEDevice::getScan(); // create new scan
  pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
  pBLEScan->setActiveScan(true); // active scan uses more power, but get results faster
  pBLEScan->setInterval(100);
  pBLEScan->setWindow(99); // less or equal setInterval value
}

void loop()
{
  json_buffer = "";
  Serial.println(WiFi.localIP());
  delay(1000);
  // json.concat("{");
  BLEScanResults foundDevices = pBLEScan->start(scanTime, false);
  Serial.print("Devices found: ");
  Serial.println(foundDevices.getCount());
  Serial.println("Scan done!");
  pBLEScan->clearResults(); // delete results fromBLEScan buffer to release memory
  // json.concat("}");
  serializeJson(doc, json_buffer);
  Serial.println(json);
  json = json_buffer;
  // json = "";
  delay(10000);
  counter = 0;
}