const { app, BrowserView, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const main = new BrowserWindow({
    width: 800,
    height: 600,
	webPreferences: {
		preload: path.join(__dirname, 'preload.js')
	}
  })

  main.loadFile('index.html')
	const sub = new BrowserWindow({ width: 300, height: 300, parent: main })

	const view = new BrowserView()
	sub.setBrowserView(view)
	view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
	view.webContents.loadURL('https://electronjs.org')
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})