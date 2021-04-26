<p align="center"><img src="/frontend/content/images/logo.png" data-canonical-src="/frontend/content/images/logo.png" width="90" height="90" /></p>

# plan-lekcji-backend
Poniższa krótka dokumentacja opisuje sposób pobierania danych z serwera do tworzenia własnych projektów opartych na zbudowanym przez nas API.

### Opis

W tym folderze znajduje się kod źródłowy serwera który umożliwia pobieranie i aktualizowanie danych planu lekcji ze szkolnej strony. Jeśli chcesz uruchomić własny serwer postępuj zgodnie z [Instrukcjami](#konfiguracja-własnego-serwera).

Serwer działa na zasadzie tak zwanego "scrappera" - uruchamiając przeglądarkę internetową bez interfejsu graficznego pobiera kod HTML ze strony szkoły. Po odpowiednim przetworzeniu dane zapisywane są do plików tekstowych skąd są gotowe na przesyłanie użytkownikom. W kategorii [podstrony](#podstrony-serwera) znajduje się dokładny opis jakie zapytania można wykonać do serwera.

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

### Konfiguracja własnego serwera

Wymagania wstępne: `Node.js` wersja 14 lub wyższa

1. Sklonuj repozytorium `git clone https://github.com/imLinguin/plan-lekcji.git`
2. Przejdź do folderu serwera `cd plan-lekcji/backend`
3. Pobierz zależności `npm install`
4. Utwórz plik `.env` i uzupełnij wartości według [Wzoru](#plik-env)
5. Uruchom serwer `npm start`
6. Wykonaj zapytanie o pobranie danych `curl -X PUT ADRES_SERWERA:PORT/updateall?key=PASSWD`, po ukończeniu procesu w konsoli serwera powinien ukazać się napis `YOINKED`
