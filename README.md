# API
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera olika jobb erfarenheter och är tänkt att fungera som ett CV. Grundläggande funktionalitet för CRUD (Create, Read, UTpdate, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: "http://127.0.0.1:3000/api/work_experiences"

## Installation, databas
APIet använder MySQL-databas. Klona ner källkodsfilerna, kör kommande npm install för att installera nödvändiga npm-paket. Kör installations-skriptet server.js. Installations-skriptet skapar databastabeller enligt nedanstående:
|Tabell-namn (works)|Fält|
|-------------------|----|
|Tabell 1|id(int), fält1(varchar(200), fält2(varchar(100), fält3(varchar(100), fält4(date), fält5(date)|

## Användning
Nedan finns beskrivet hur man når APIet på olika vis:
|Metod|Ändpunkt            |Beskrivning                   |
|-----|--------------------|------------------------------|
|GET  |/work_experience    |Hämtar alla tillgängliga jobb.|
|GET  |/work_experience/:id|Hämtar en specifik kurs med angivet ID.|
|POST |/work_experience    |Lagrar ett nytt jobb. Kräver att ett jobb-objekt skickas med.|
|PUT|/work_experience/:id  |Uppdaterar en existerande kurs med angivet ID. Kräver att ett jobb-objekt skickas med.|
|DELETE|/work_experience/:id|Raderar en kurs med angivet ID.|

Ett kurs-objekt returneras/skickas som JSON med följande struktur:
{
"companyname": "Hotell Laponia",
"jobtitle": "Receptionist",
"location": "Arvidsjaur", 
"startdate": "2021-10-17", 
"enddate": "2022-03-20"
}
