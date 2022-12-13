/*
 * Nome do arquivo: main.cpp
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
 * Este programa tem como propósito auxiliar na procura por
 * dispositivos que utilizam a tecnologia BLE. Foi utilizado
 * o ESP32-S3 e seu módulo bluetooth. No contexto do problema
 * apresentado, o microcontrolador funciona como um beacon BLE,
 * que mostra todos os dispositivos com o BLE ativo no momento,
 * gera um JSON e retorna os endereços encontrados para um servidor.
 */


//OBS: ESSE ARQUIVO EXISTE PARA SER USADO NO VISUAL STUDIO CODE COM A EXTENSÃO PIO-IDE


// Inclusão das bibliotecas utilizadas no projeto
// Caso alguma dessas não esteja instalada, consulte
// o manual de instruções.
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

// Nome e senha da rede de WiFi na qual se quer conectar 

const char *ssid = "Inteli-welcome";
const char *password = "";

// Endereço do servidor Web onde a requisição será enviada

String serverName = "http://10.128.1.200:3000/test_device";
String request;

// Inicia o servidor assíncrono local do ESP32

AsyncWebServer localServer(80);

// Para a procura dos dispositivos com o bluetooth, utilizamos
// ciclos de 5 segundos para cada busca e os dispositivos encontrados
// São reconhecidos por pBLEScan 

int scanTime = 5; // Em segundos
BLEScan *pBLEScan;

// Criação do JSON - Inicialmente, são criadas duas variáveis
// para que não haja problemas em enviar conteúdos vazios
// O contador serve para indicar a quantidade de dispositivos
// encontrados em cada varredura

String json, json_buffer = "";
DynamicJsonDocument doc(2048);
int counter = 0;

// Função de callback que mostra as informações do dispositivo
// encontrado, como nome, endereço Bluetooth. Ao final da função
// , a variável contadora será acrescida em uma unidade.

class MyAdvertisedDeviceCallbacks : public BLEAdvertisedDeviceCallbacks
{
  void onResult(BLEAdvertisedDevice advertisedDevice)
  {
    Serial.printf("Advertised Device: %s \n", advertisedDevice.toString().c_str());
    doc[String(counter)] = advertisedDevice.getAddress().toString();
    counter += 1;
  }
};

void setup()
{
  Serial.begin(115200); // Inicia o monitor Serial com a Baud-Rate 115200

  WiFi.begin(ssid, password); // Inicia a comunicação com a rede WiFi definida acima
  Serial.println("Connecting...");
  while (WiFi.status() != WL_CONNECTED) // Não prossegue enquanto não conseguir estabelecer a comunicação
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: "); // Indica o sucesso da comunicação
  Serial.println(WiFi.localIP()); // Mostra o IP do ESP32 no Monitor Serial

  // Estabelendo o comando para procurar os dispositivos através do endpoint local
  // 'list_devices'. Uma vez que este é acionado, o microcontrolador começa a procurar
  // por dispositivos com BLE ativado, armazenando seus endereços e gerando um JSON para
  //  posteriormente enviá-lo ao servidor, o qual trata e manuseia os dados.

  localServer.on("/list_devices", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
    if(WiFi.status() == WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      http.begin(client, serverName); // Inicia uma requisição http ao endereço descrito em 'serverName'

      int httpResponseCode = http.POST(json); // Envia o JSON ao servidor

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode); // Retorna a resposta 
          
      // Free resources
      http.end(); // Encerra a requisição http

    }
    request->send(200, "application/json", json); }); // Retorna o JSON ao servidor que fez a requisição ao ESP32

  localServer.begin(); // Efetivamente inicia o servidor local

  // Os comandos abaixo servem para configurar o Bluetooth no ESP32
  // para que este funcione como beacon, definindo a função de callback
  // usada e as caracteristicas do scanner.

  BLEDevice::init("");
  pBLEScan = BLEDevice::getScan(); // Cria novo scan
  pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
  pBLEScan->setActiveScan(true); // Ativar o scan utiliza mais energia, contudo é mais rápido
  pBLEScan->setInterval(100);
  pBLEScan->setWindow(99); // menor ou igual ao valor de setInterval
}

void loop()
{

  json_buffer = ""; // Inicia o JSON temporário como vazio
  Serial.println(WiFi.localIP()); // Imprime no monitor Serial o IP do ESP32
  delay(1000); // Espera um segundo antes de iniciar as buscas

  BLEScanResults foundDevices = pBLEScan->start(scanTime, false); // Inicia o scanner 
  Serial.print("Devices found: "); 
  Serial.println(foundDevices.getCount()); // Imprime a quantidade de dispoistivos encontrados na varredura
  Serial.println("Scan done!");
  pBLEScan->clearResults(); // Deleta resultados do buffer BLEScan para liberar memória 

  serializeJson(doc, json_buffer); // Cria um JSON e transfere todas as informações obtidas para o temporário
  Serial.println(json); // Imprime o resultado do JSON
  json = json_buffer; // Atribui os resultados do JSON temporário para o efetivo

  counter = 0; // Zera o número de dispositivos encontrados para a próxima iteração
}