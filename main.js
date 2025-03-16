const { app, BrowserWindow, screen } = require('electron')

const createWindow = () => {
    const { screenWidth, screenHeight } = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        // frame: false,
        width: 800,
        height: 600,
        // visibleOnAllWorkspaces: true,
        type: 'toolbar',
        x: screenWidth - 800,
        y: screenHeight - 600,
        // focusable: false,
        menuBarVisible: false,
        webPreferences: {
            nodeIntegration: true
        },
    })
    win.setAlwaysOnTop(true, 'normal', 1)
    
    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
