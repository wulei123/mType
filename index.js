const {app,BrowserWindow} = require('electron')

const path = `file://${__dirname}/index.html`

app.on('ready',()=>{
	const win = new BrowserWindow({width:800,height:600})
	win.loadURL(path)
})