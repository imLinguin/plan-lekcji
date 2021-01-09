const { BrowserWindow, app } = require("electron");
const path = require("path");
let window;
function createWindow() {
  window = new BrowserWindow({
    title: "Plan lekcji",
    width: 800,
    height: 400,
    icon: "",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      devTools: true,
    },
  });

  window.loadFile(path.join(__dirname, "content", "index.html"));
  window.show();
}
app.setName("Plan Lekcji");
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
