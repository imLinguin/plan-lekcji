# plan-lekcji
Poniższa krótka dokumentacja opisuje sposób pobierania danych z serwera do tworzenia własnych projektów opartych na zbudowanym przez nas API.

### Zależności:
- [cheerio](https://www.npmjs.com/package/cheerio)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [puppeteer](https://www.npmjs.com/package/puppeteer)

### Do zrobienia:
* [x] Grupy klasowe
* [x] Opcje czy ktoś uczęszcza na religię
* [x] Endpoint do aktualizacji planu ze szkolnej strony

### Podstrony serwera:
- **GET** /plany/**_id_**?
  - day, dzień tygodnia - od 1 do 5 (opcjonalne, domyślnie-dzisiejszy dzień)
  - group, grupa/grupy w klasie po przecinku - np **2/2,2/4** (opcjonalne, domyślnie-zwraca lekcje dla wszystkich grup)
  - rel, czy ktoś uczęszcza na lekcje religii - **true/false**, (opcjonalne, domyślnie-true)
- **GET** /klasy
- **PUT** /updateall?
  - key, hasło do aktualizacji podawane w pliku .env

### PLIK ENV:
Plik ENV zawiera dane takie jak:

- PORT - port sieciowy na którym serwer będzie aktywny
- PASSWD - hasło do aktualizacji danych
- SHORT - boolean czy lekcje są skrócone
