<p align="center"><img src="/frontend/content/images/logo.png" data-canonical-src="/frontend/content/images/logo.png" width="90" height="90" /></p>

# plan-lekcji

Szkolny projekt na wystawę prac uczniów.

## Opis

Plan Lekcji jest aplikacją, która:
 - pokazuje plan lekcji dla zdefiniowanej grupy oraz klasy
 - wysyła powiadomienie o rozpoczęciu się danej lekcji
 - odlicza czas, który pozostał do zakończenia pojedynczej lekcji, jak i ich wszystkich
 - pokazuje plan lekcji na kolejny dzień (po zakończeniu wszystkich w danym dniu)
 - wyświetla aktualnie trwającą lekcję 🔊
 - za pomocą ✅ oznacza zakończone lekcje

Plan jest w pełni kompatybilny i synchronizowany z lekcjami skróconymi.

Aplikacja stworzona jest przy wykorzystaniu [ElectronJS](https://www.electronjs.org/).

Jest to framework, który pozwala użytkownikowi tworzyć aplikacje desktopowe przy użyciu HTML, CSS i JavaScriptu. 
Technologia stanowi połączenie dwóch niezwykle popularnych bibliotek: Node. js i Chromium.

Przy jego wykorzystaniu zostały stworzone aplikacje takie jak:
 - [Visual Studio Code](https://code.visualstudio.com/)
 - [Discord](https://discord.com/)
 - [Twitch](https://www.twitch.tv/)
 - [Microsoft Teams](https://teams.microsoft.com)
 - [balenaEtcher](https://www.balena.io/etcher/)
 - [Skype](https://www.skype.com/pl/)

Plan jest pobierany ze szkolnej strony internetowej. Szczegóły znajdują się [Tutaj](https://github.com/imLinguin/plan-lekcji/tree/main/backend).

## Instalacja

Poniższe kroki przedstawają krok po kroku proces instalacji: 

### Windows
 1. Pobierz plik z rozszerzeniem `.exe` z najnowszego [Wydania](https://github.com/imLinguin/plan-lekcji/releases/latest).
 2. Uruchom instalator.
 3. Instalacja nie wymaga interakcji użytkownika ani uprawnień administratora.

Plik `preferences.json` który odpowiada za zapisanie informacji o ustawieniach znajduje się w odpowiednim folderze w `C:\Users\NAZWA_UŻYTKOWNIKA\AppData\Roaming\Plan Lekcji Elektronik`.
  
### Linux
  1. Pobierz plik z rozszerzeniem `.AppImage` z najnowszego [Wydania](https://github.com/imLinguin/plan-lekcji/releases/latest).
  2. Przenieś plik do preferowanej lokalizacji.
  3. Uruchom plik.

**WAŻNE** póki co nie jest tworzony plik .dekstop przez co aplikacja nie ukazuje się w menu aplikacji. Zalecane jest umieszczenie pliku w miejscu gdzie będzie łatwo dostępny.

Plik `preferences.json` który odpowiada za zapisanie informacji o ustawieniach znajduje się w odpowiednim folderze w `~/.config/`.

## Konfiguracja
 ![obraz](https://user-images.githubusercontent.com/62100117/111635657-05919c00-87f8-11eb-888b-bd0bf135b599.png)

 Gdy program uruchomiony jest poraz pierwszy, użytkownika przywita okno ustawień gdzie należy wypełnić poniższe pola:
 - Religia - zaznaczone jeśli uczeń uczęszcza na religię.
 - Klasa - pełna nazwa klasy np. 1g, 2cs, 3h, 4b
 - Grupa - grupa do której należymy w formacie **grupa/liczba_grup**, jeśli na planie lekcji na stronie szkoły występuje kilka przedziałów grup np: 
  
  ![obraz](https://user-images.githubusercontent.com/62100117/111636987-4938d580-87f9-11eb-9326-74bfdb2a571f.png)

  W takim przypadku należy podać obie grupy które są dla nas odpowiednie np. `2/2,2/4`

 - Motyw - do wyboru `Jasny` i `Ciemny`;
 
## Znane problemy
  System Windows wyświetla okno (widoczne na zdjęciu niżej) przy próbie uruchomienia instalatora. Jest to spowodowane brakiem certyfikatu. Spokojnie to nie wirus 😊. Aby ominąć problem należy kliknąć `Więcej informacji` a następnie `Uruchom mimo to`.
 ![Błąd Orwella](https://user-images.githubusercontent.com/62100117/111198030-6da96d80-85bf-11eb-9a42-9eb084797fb7.png)
 
## Autorzy

- Aleksander Baran (front-end)
- Paweł Lidwin (back-end)
- Marek Bartoń (server administrator)
