const { BrowserWindow, app, ipcMain, session } = require("electron");
const fs = require("fs");
const path = require("path");
let window;
let popup;
function QuitApp() {
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
    title: "Plan lekcji",
    width: 500,
    height: 700,
    resizable: false,
    icon: "content/images/logo.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      allowRunningInsecureContent: false,
    },
  });

  window.loadFile(path.join(__dirname, "content", "main", "index.html"));
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
}

app.setName("Plan Lekcji");
app.setAppUserModelId("Plan Lekcji");
app.whenReady().then(() => {
  createWindow();
  try {
    //Jeśli plik z preferencjami nie istnieje otwórz okno ustawień przy uruchomieni
    if (!fs.existsSync("preferences.json")) {
      customizationPopup();
    }
    //Jeśli główne okno zostało zamknięte zakończ proces
    window.on("closed", () => {
      QuitApp();
    });
  } catch (error) {}
});

//Zakończ proces jeśli wszystkie okna są zamknięte
app.on("window-all-closed", () => {
  QuitApp();
});
//Zapisz preferencje do pliku jeśli kliknięto przycisk zapisz w ustawieniach
ipcMain.on("closensave-popup", (from, data) => {
  fs.writeFileSync(
    path.join(__dirname, "preferences.json"),
    JSON.stringify(data)
  );
  popup.close();
  RefreshMain();
});

ipcMain.on("open-preferences", (event, args) => {
  customizationPopup();
});

ipcMain.on("get-preferences", async (event) => {
  let preferencje;
  if (fs.existsSync(path.join(__dirname, "preferences.json"))) {
    preferencje = fs.readFileSync(path.join(__dirname, "preferences.json"));
    preferencje = await JSON.parse(preferencje);
  }
  event.returnValue = preferencje || null;
});

ipcMain.on("plan-fetched", (event) => {
  event.reply("plan-ready");
});

ipcMain.on("refresh-main", () => {
  RefreshMain();
});

ipcMain.on("render-po-lekcjach", () => {
  if (window)
    window.loadFile(
      path.join(__dirname, "content", "po-lekcjach", "po-lekcjach.html")
    );
});
