document.querySelector(".save").addEventListener("click",()=>{
    ipcRenderer.send("close-popup",null)
})