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
* [x] Opcje czy ktoś uczęszcza na religię
* [x] Endpoint do aktualizacji planu ze szkolnej strony
* [ ] Zrobienie testów jednostkowych itd.. (opcjonalne)

### ENDPOINTS:
- **GET** /plany/**_id_**?
  - day, dzień tygodnia - od 1 do 5
  - group, grupa/grupy w klasie po przecinku - np **2/2,2/4**
  - rel,czy ktoś uczęszcza na lekcje religii - **true/false**,
- **PUT** /updateall?
  - key, hasło do aktualizacji podawane w pliku .env
