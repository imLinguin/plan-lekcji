const { BrowserWindow, app } = require("electron");
const path = require("path");
let window;
function createWindow() {
  window = new BrowserWindow({
    title: "Plan lekcji",
    width: 500,
    height: 700,
    resizable:false,
    icon: "content/images/logo.png",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true,
    },
  });

  window.loadFile(path.join(__dirname, "content", "index.html"));
  window.show();
}
app.setName("Plan Lekcji");
app.whenReady().then(createWindow);
app.setAppUserModelId("Plan Lekcji");

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
