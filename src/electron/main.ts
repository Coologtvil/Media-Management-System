import { app, BrowserWindow, ipcMain, dialog } from "electron";
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

  ipcMain.handle('upload-media', async (event, filePaths) => {
    
    console.log("File paths before IPC:", filePaths)
    const pythonProcess = spawn('python', ['./db/main.py', 'upload', ...filePaths])
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python stdout: ${data}`)
    })

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`)
    })

    return new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve('Upload completed successfully')
        } else {
          reject(`Python process exited with code ${code}`)
        }
      })
    })
  })

  ipcMain.handle('upload-media-folder', async (event, folderPath) => {
    const pythonProcess = spawn('python', ['./db/main.py', 'upload-folder', folderPath])
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python stdout: ${data}`)
    })

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`)
    })

    return new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve('Folder upload completed successfully')
        } else {
          reject(`Python process exited with code ${code}`)
        }
      })
    })
  })
// File selection handler
ipcMain.handle("dialog:openFiles", async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Media Files", extensions: ["jpg", "png", "mp4", "mp3"] },
    ],
  });
  return result.filePaths; // Return the selected file paths to the renderer process
});

// Folder selection handler
ipcMain.handle("dialog:openFolder", async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ["openDirectory"],
  });
  return result.filePaths[0]; // Return the selected folder path
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
	preload: "./preload.js"
      },
    });

    if (isDev()) {
      mainWindow.loadURL("http://localhost:5123");
    } else {
      mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }
  }
});

