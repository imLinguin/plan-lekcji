const { BrowserWindow, app, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
let window;
let popup;
function QuitApp() {
  if (process.platform !== "darwin") {
    app.quit();
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
    height: 200,
    resizable: false,
    frame: false,
    icon: "content/images/customization-icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  });

  popup.loadFile(path.join(__dirname, "content", "popup", "popup.html"));
}

app.setName("Plan Lekcji");
app.setAppUserModelId("Plan Lekcji");
app.whenReady().then(() => {
  createWindow();
  try {
    if (fs.existsSync("preferences.json")) {
    } else {
      customizationPopup();
    }
    window.on("closed", () => {
      QuitApp();
    });
  } catch (error) {}
});

//events
app.on("window-all-closed", () => {
  QuitApp();
});

ipcMain.on("closensave-popup", (from, data) => {
  fs.writeFileSync(
    path.join(__dirname, "preferences.json"),
    JSON.stringify(data)
  );
  popup.close();
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
