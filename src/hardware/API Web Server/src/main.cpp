#include <Arduino.h>
#include <Wifi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <FreeRTOS.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>

#define SSID "Inteli-COLLEGE"
#define PWD "QazWsx@123"

#define DESTINY "10.128.64.230:3000"
#define RETURN_MESSAGE "Test Successfull"

WiFiClient client;
AsyncWebServer serverBase(80);
HTTPClient httpBase;

StaticJsonDocument<200> test;

class LocalAPI
{
private:
  char *ssidGERAL = "";
  char *passGERAL = "";
  char strIP[20] = "";
  AsyncWebServer *server;
  int mensagemRecebida = 0;
  char mensagem[1000];

public:
  LocalAPI(char *ssid, char *pass, AsyncWebServer *s)
  {
    server = s;
    Serial.printf("Connecting to %s senha:%s\n", ssid, pass);
    ssidGERAL = ssid;
    passGERAL = pass;
    WiFi.begin(ssidGERAL, passGERAL);
  };

  void ConnectToWiFi()
  {
    while (WiFi.status() != WL_CONNECTED)
    {
      delay(500);
      Serial.print(".");
    }
    strcpy(strIP, WiFi.localIP().toString().c_str());
    Serial.printf("\n Connected to Wi-Fi:%s - IP:%s\n", SSID, strIP);
    Serial.println(WiFi.localIP());
  };

  void SetEndpoints()
  {
    Serial.println("Inicia modo de recepcao");
    server->on("/", HTTP_GET,
               [](AsyncWebServerRequest *request)
               {
                 Serial.println("Recebida");
                 request->send_P(200, "text/plain", RETURN_MESSAGE);
               });
    server->on("/devices", HTTP_GET,
                [](AsyncWebServerRequest *request)
                {
                 Serial.println("Mandando JSON");
                 String json;
                 serializeJson(test, json);
                 request->send(200, "application/json", json);
                });
    server->begin();
  };

  char *IPGeral()
  {
    return (strIP);
  }
};
LocalAPI *API = NULL;

class BackendAPI
{
private:
  char baseURL[500] = "";
  char *ssidGERAL = "";
  char *passGERAL = "123456789";
  char mensagem[1000] = "Valor inicial";
  HTTPClient *http;

public:
  BackendAPI(char *ssid, char *pass, char *baseip, HTTPClient *h)
  {
    ssidGERAL = ssid;
    passGERAL = pass;
    strcat(baseURL, "http://");
    strcat(baseURL, baseip);
    strcat(baseURL, "/test");
    http = h;
  };

  void conecta()
  {
    http->begin(baseURL);
    Serial.println(baseURL);
    int respCode = http->GET();
    if (respCode > 0)
    {
      Serial.print("HTTP Response code: ");
      Serial.println(respCode);
      Serial.println(mensagem);
      sprintf(mensagem, "%s", http->getString().c_str());
      Serial.println(mensagem);
    }
    else
    {
      Serial.print("Error code: ");
      Serial.println(respCode);
    }
    // Free resources
    http->end();
  };
  char *getMensagem()
  {
    return (mensagem);
  };
};
BackendAPI *acessBackend = NULL;

void setup()
{
  Serial.begin(115200);

  API = new LocalAPI(SSID, PWD, &serverBase);
  API->ConnectToWiFi();
  API->SetEndpoints();

  acessBackend = new BackendAPI(SSID, PWD, DESTINY, &httpBase);

  acessBackend->conecta();

  test["new_information"] = "Some text here";
  test["ID"] = 123;
}

void loop()
{
  Serial.println(API->IPGeral());
  delay(2000);
  Serial.printf("Mensagem recebida: %s\n", acessBackend->getMensagem());
  delay(2000);
  // server.handleClient();
}