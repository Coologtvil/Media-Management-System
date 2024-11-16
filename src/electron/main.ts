import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { spawn } from "child_process"; // For Python integration
import { isDev } from "./util.js";

let mainWindow: BrowserWindow | null = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allow node modules in the renderer process
      contextIsolation: false, // Required for IPC to work seamlessly
      webSecurity: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});

// Handle Python communication
ipcMain.handle("fetch-media", async () => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["./db/main.py", "fetch"]);

    let result = "";
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
      reject(data.toString());
    });

    pythonProcess.on("close", () => {
      try {
        const parsedResult = JSON.parse(result);
        resolve(parsedResult);
      } catch (error) {
        reject("Failed to parse Python output");
      }
    });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    if (isDev()) {
      mainWindow.loadURL("http://localhost:5123");
    } else {
      mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }
  }
});

