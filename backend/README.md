# plan-lekcji
Express api for school project

### (Dependencies) Zależności:
- [cheerio](https://www.npmjs.com/package/cheerio)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [puppeteer](https://www.npmjs.com/package/puppeteer)

### (TODO) Do zrobienia:
* [x] Grupy klasowe
* [x] Endpoint do aktualizacji planu ze szkolnej strony
* [ ] Zrobienie testów jednostkowych itd..

### ENDPOINTS:
#### a) **GET** /plany/**_id_**?
- day, od 1 do 5
- group, grupa w klasie
#### b) **PUT** /updateall?
- key, hasło do aktualizacji
