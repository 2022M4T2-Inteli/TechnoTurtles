/*
  Tecnoturtles - Bluetooth and Wi-Fi communication with ESP32
   Based on Neil Kolban example for IDF: https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLE%20Tests/SampleScan.cpp
   Ported to Arduino ESP32 by Evandro Copercini
*/

// Including all the libraries used for Wi-Fi and Bluetooth 
#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include <WiFi.h>
#include "esp_wifi.h"

// Indicating the interval between scan payload broadcasting and create an object of the BLEscan class. 

int scanTime = 5; // In seconds
BLEScan* pBLEScan;

class MyAdvertisedDeviceCallbacks: public BLEAdvertisedDeviceCallbacks {
    void onResult(BLEAdvertisedDevice advertisedDevice) {
      Serial.printf("Advertised Device: %s \n", advertisedDevice.toString().c_str());
    }
};

void setupBT(){
  // Routine to search BlueTooth devices 

  Serial.println("Scanning...");

  // Initiating the BLE module in ESP32 with no name

  BLEDevice::init("");

  //Setting parameters for the scanner

  pBLEScan = BLEDevice::getScan(); // create new scan
  pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
  pBLEScan->setActiveScan(true); // active scan uses more power, but get results faster
  pBLEScan->setInterval(100);
  pBLEScan->setWindow(99);  // less or equal setInterval value
}

void buscaBT(){
  // Displays all devices found by bluetooth search
  
  BLEScanResults foundDevices = pBLEScan->start(scanTime, false);
  Serial.print("Devices found: ");
  Serial.println(foundDevices.getCount());
  Serial.println("Scan done!");
  pBLEScan->clearResults();   // delete results fromBLEScan buffer to release memory
  delay(2000);
}


void setup() {
  Serial.begin(115200);

  WiFi.softAP("MyESP32AP"); // Sets ESP32 to be a soft Wi-Fi Acess Point with the name "MyESP32AP"

  setupBT()

}

void buscaWifi(){
  wifi_sta_list_t wifi_sta_list; // Creating a list of Wi-Fi stations
  tcpip_adapter_sta_list_t adapter_sta_list; // Creating a list of TCP/IP stations

  memset(&wifi_sta_list, 0, sizeof(wifi_sta_list)); // Clearing the list of Wi-Fi stations
  memset(&adapter_sta_list, 0, sizeof(adapter_sta_list)); // Clearing the list of TCP/IP stations

  esp_wifi_ap_get_sta_list(&wifi_sta_list); // Getting the list of Wi-Fi stations
  tcpip_adapter_get_sta_list(&wifi_sta_list, &adapter_sta_list);

  for (int i = 0; i < adapter_sta_list.num; i++)
  {

    tcpip_adapter_sta_info_t station = adapter_sta_list.sta[i]; // Get the station information

    Serial.print("station nr ");
    Serial.println(i); // Print the station number

    Serial.print("MAC: ");

    for (int i = 0; i < 6; i++) 
    {

      Serial.printf("%02X", station.mac[i]); // Print the MAC address of the station
      if (i < 5)
        Serial.print(":");
    }

    Serial.print("\nIP: "); 
    Serial.println(station.ip.addr); // Print the IP address of the station
  }

  Serial.println("-----------");
  delay(5000);
}

void loop() {
  buscaBT();
  buscaWifi();
}