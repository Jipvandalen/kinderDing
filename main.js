const { app, BrowserView, BrowserWindow } = require('electron')
const path = require('path')
const ftp = require('ftp')
const writeFile = require('fs')

const createWindow = () => {
  const main = new BrowserWindow({
    width: 800,
    height: 600,
	webPreferences: {
		preload: path.join(__dirname, 'preload.js')
	}
  })

  main.loadFile('index.html')
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
