/*
 * Nome do arquivo: peripheral.ino
 * TecnoTurtles
 * 
 * INTELI - Módulo 4 - Prototipação de solução para IoT 2022-2B
 * Parceiro: Beacon School
 * 
 * Autores:
 * Emanuele Lacerda Morais Martins
 * Filipi Enzo Siqueira Kikuchi
 * Gabriel Metello Nascimento
 * Gabriela de Morais da Silva
 * Lucas Henrique Sales de Souza
 * Pedro Henrique Sant'Anna Oliveira
 * 
 * Este programa tem como propósito configurar ESP32-S3 que serão
 * utilizados como tags para a localização dos dispositivos.
 */

// Inclusão das bibliotecas utilizadas no projeto
// Caso alguma dessas não esteja instalada, consulte
// o manual de instruções.

#include <Arduino.h>

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// Acesse o seguinte link para gerar UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID        "COLOQUE UM UUID AQUI!" //Exemplo "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "COLOQUE OUTRO UUID AQUI!" //Exemplo "beb5483e-36e1-4688-b7f5-ea07361b26a8"

void setup() {
  Serial.begin(115200); // Inicia o monitor Serial com a Baud-Rate 115200
  Serial.println("Starting BLE work!");

  // Configuração das características do ESP32 como periférico

  BLEDevice::init("Escolha o nome do dispositivo aqui!");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );

  pCharacteristic->setValue("Ola ESP32");
  pService->start();
  // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // Isso ainda funciona para compatibilidade com versões anteriores
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // Função que ajuda com conexão com iPhone
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Caracteristicas definidas!");
}

void loop() {
  delay(2000);
}