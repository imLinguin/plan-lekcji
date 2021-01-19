const { BrowserWindow, app, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
let window;
let popup;
function QuitApp()
{
  if (process.platform !== "darwin") {
    app.quit();
  }
}
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

  window.loadFile(path.join(__dirname, "content","main", "index.html"));
  window.setMenuBarVisibility(false)
  window.show();
}
function customizationPopup()
{
  popup = new BrowserWindow({
    title:"Personalizacja",
    width:400,
    height:200,
    resizable:false,
    frame:false,
    icon:"content/images/customization-icon.png",
    webPreferences:{
      nodeIntegration:false,
      contextIsolation:true,
      devTools:true,
    }
  })
}

app.setName("Plan Lekcji");
app.whenReady().then(()=>{
  createWindow();
  try{
  if(fs.existsSync("preferences.json")){
    console.log("Istnieje")
  }
  else{
    customizationPopup();
  }
  window.on("closed",()=>{
    QuitApp();
  })
}
catch(error){}
});
//events


app.setAppUserModelId("Plan Lekcji");

app.on("window-all-closed", () => {
  QuitApp();
});


ipcMain.on("close-popup",()=>{
  popup.close();
})