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
#include <MFRC522.h>
#include <SPI.h>
#include <Wire.h>

// Indicating the interval between scan payload broadcasting and create an object of the BLEscan class. 

int scanTime = 5; // In seconds
BLEScan* pBLEScan;

class MyAdvertisedDeviceCallbacks: public BLEAdvertisedDeviceCallbacks {
    void onResult(BLEAdvertisedDevice advertisedDevice) {
      Serial.printf("Advertised Device: %s \n", advertisedDevice.toString().c_str());
    }
};

//rfid
#define RFID_SS_SDA 47
#define RFID_RST 14

MFRC522 rfidBase = MFRC522(RFID_SS_SDA, RFID_RST);
class LeitorRFID{
  private:
    char codigoRFIDLido[100] = "";
    char codigoRFIDEsperado[100] = "";
    MFRC522 *rfid = NULL;
    int cartaoDetectado = 0;
    int cartaoJaLido = 0;
    void processaCodigoLido(){
      char codigo[3*rfid->uid.size+1];
      codigo[0] = 0;
      char temp[10];  
      for(int i=0; i < rfid->uid.size; i++){
        sprintf(temp,"%X",rfid->uid.uidByte[i]);
        strcat(codigo,temp);
      }
      codigo[3*rfid->uid.size+1] = 0;    
      strcpy(codigoRFIDLido,codigo);
      Serial.println(codigoRFIDLido);
    }
  public:
    LeitorRFID(MFRC522 *leitor){
      rfid = leitor;
      rfid->PCD_Init(); 
      Serial.printf("MOSI: %i MISO: %i SCK: %i SS: %i\n",MOSI,MISO,SCK,SS);
    };
    char *tipoCartao(){
      MFRC522::PICC_Type piccType = rfid->PICC_GetType(rfid->uid.sak);
      Serial.println(rfid->PICC_GetTypeName(piccType));
      return((char *)rfid->PICC_GetTypeName(piccType));
    };
    int cartaoPresente(){
      return(cartaoDetectado);
    };
    int cartaoFoiLido(){
      return(cartaoJaLido);
    };
    void leCartao(){
      if (rfid->PICC_IsNewCardPresent()) { // new tag is available
        Serial.println("Cartao presente");
        cartaoDetectado = 1;
        if (rfid->PICC_ReadCardSerial()) { // NUID has been readed      
          Serial.println("Cartao lido");  
          cartaoJaLido = 1;
          processaCodigoLido();
          rfid->PICC_HaltA(); // halt PICC
          rfid->PCD_StopCrypto1(); // stop encryption on PCD
        }
      }else{
        cartaoDetectado = 0;
      }
    };
    char *cartaoLido(){
      return(codigoRFIDLido);
    };
    void resetarLeitura(){
      cartaoDetectado = 0;
      cartaoJaLido = 0;
    }
    void listI2CPorts(){
      Serial.println("\nI2C Scanner");
      byte error, address;
      int nDevices;
      Serial.println("Scanning...");
      nDevices = 0;
      for(address = 1; address < 127; address++ ) {
        Wire.beginTransmission(address);
        error = Wire.endTransmission();
        if (error == 0) {
          Serial.print("I2C device found at address 0x");
          if (address<16) {
            Serial.print("0");
          }
          Serial.println(address,HEX);
          nDevices++;
        }
        else if (error==4) {
          Serial.print("Unknow error at address 0x");
          if (address<16) {
            Serial.print("0");
          }
          Serial.println(address,HEX);
        }    
      }
      if (nDevices == 0) {
        Serial.println("No I2C devices found\n");
      }
      else {
        Serial.println("done\n");
      }
    };
};
LeitorRFID *leitor = NULL;

void bluetoothSetup(){
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

void bluetoothSearch(){
  // Displays all devices found by bluetooth search
  
  BLEScanResults foundDevices = pBLEScan->start(scanTime, false);
  Serial.print("Devices found: ");
  Serial.println(foundDevices.getCount());
  Serial.println("Scan done!");
  pBLEScan->clearResults();   // delete results fromBLEScan buffer to release memory
  delay(2000);
}

void wifiSearch(){
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

void setup() {
  Serial.begin(115200);
  SPI.begin();
  WiFi.softAP("MyESP32AP"); // Sets ESP32 to be a soft Wi-Fi Acess Point with the name "MyESP32AP"
  bluetoothSetup();

  leitor = new LeitorRFID(&rfidBase);

}


void loop() {
  bluetoothSearch();
  delay(1000);
  wifiSearch();
  for(int i = 0; i<100; i++) {
    Serial.println("Lendo Cartao:");
    leitor->leCartao();
    if(leitor->cartaoFoiLido()){
      Serial.println(leitor->tipoCartao());
      Serial.println(leitor->cartaoLido());
      leitor->resetarLeitura();
      delay(1000);
    }
  }
}