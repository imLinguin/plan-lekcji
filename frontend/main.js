const {
  BrowserWindow,
  app,
  ipcMain,
  nativeTheme,
  dialog,
} = require("electron");
const fs = require("fs");
const path = require("path");
let window;
let popup;
let preferencje;
function QuitApp() {
  //darwin - MacOS
  //Na macu zwykle nie zamykamy procesu
  //a pozostawiamy programy aktywne do momentu zamknięcia przez użytkownika Cmd+Q
  //Trzeba przetestować jak to wygląda w naszym przypadku
  if (process.platform !== "darwin") {
    app.quit();
  }
}
function RefreshMain() {
  if (window) {
    window.reload();
  }
}
function createWindow() {
  window = new BrowserWindow({
    title: "Plan Lekcji",
    width: 500,
    height: 700,
    resizable: false,
    minimizable: false,
    icon: "content/images/logo.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      allowRunningInsecureContent: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, "content", "main-preload.js"),
    },
  });
  let day = new Date().getDay();
  //Sprawdzenie czy jest weekend i wyświetlenie odpowiedniego html
  if (day === 6 || 0)
    window.loadFile(path.join(__dirname, "content", "wolne", "wolne.html"));
  //W przeciwnym wypadku uruchomić głównt html
  else window.loadFile(path.join(__dirname, "content", "main", "index.html"));
  window.setMenuBarVisibility(false);
  window.show();
}
function customizationPopup() {
  popup = new BrowserWindow({
    title: "Personalizacja",
    width: 400,
    height: 430,
    resizable: false,
    frame: true,
    icon: "content/images/customization-icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      allowRunningInsecureContent: false,
    },
  });
  popup.loadFile(path.join(__dirname, "content", "popup", "popup.html"));
  popup.setMenuBarVisibility(false);
}
async function loadPrefs() {
  if (fs.existsSync(path.join(__dirname, "preferences.json"))) {
    preferencje = fs.readFileSync(path.join(__dirname, "preferences.json"));
    preferencje = await JSON.parse(preferencje);
  }
  nativeTheme.themeSource = (preferencje?.motyw === true ? "light":"dark");
}
//Ustawienia wstępne
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.setName("Plan Lekcji");
//Wymagana linia na windowsie do powiadomien
app.setAppUserModelId("Plan Lekcji");
//Gdy program w pełni uruchomiony wykonaj kod
app.whenReady().then(() => {
  //Ładowanie pliku z preferencjami
  loadPrefs();
  //Otworzenie głównego okna
  createWindow();
  try {
    //Jeśli plik z preferencjami nie istnieje otwórz okno ustawień przy uruchomieni
    if (!fs.existsSync("preferences.json")) {
      customizationPopup();
    }
    //Jeśli główne okno zostało zamknięte zamiast tego je ukryj proces
    window.on("close", (e) => {
      QuitApp();
    });
  } catch (error) {}
});
//Zapisz preferencje do pliku jeśli kliknięto przycisk zapisz w ustawieniach
ipcMain.on("closensave-popup", (from, data) => {
  fs.writeFileSync(
    path.join(__dirname, "preferences.json"),
    JSON.stringify(data)
  );
  preferencje = data;
  nativeTheme.themeSource = (preferencje?.motyw === true ? "light": "dark"  );
  popup.close();
  popup = null;
  RefreshMain();
});
//Otwarcie preferencji
ipcMain.on("open-preferences", (event, args) => {
  customizationPopup();
});
//Zwrócenie wartości preferencji do procesu render
ipcMain.on("get-preferences", async (event) => {
  event.returnValue = preferencje || null;
});
//Wywołanie eventu gdy plan zostanie pobrany z serwera
ipcMain.on("plan-fetched", (event) => {
  event.reply("plan-ready");
});
//Odświerzanie głównego okna na polecenie z procesu render
ipcMain.on("refresh-main", () => {
  RefreshMain();
});
//Wczytanie pliku jeśli lekcje się skończyły
ipcMain.on("render-po-lekcjach", () => {
  if (window)
    window.loadFile(
      path.join(__dirname, "content", "po-lekcjach", "po-lekcjach.html")
    );
});
//Wyświetlenie okna dialogowego jeśli wystąpi błąd.
ipcMain.on("fetch-error", (event, data) => {
  let ch = dialog.showMessageBoxSync({
    type: "error",
    title: "Mamy problem",
    message: data,
    buttons: ["Otwórz ustawienia", "Ogarnę to"],
  });
  if (ch == 0) {
    customizationPopup();
  }
});
