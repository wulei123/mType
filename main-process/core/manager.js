const {ipcMain} = require('electron')

ipcMain.on('title-to-content',(event,arg)=>{
	event.sender.send('content-get-values',arg)
})
ipcMain.on('content-to-title',(event,arg)=>{
	event.sender.send('title-get-values',arg)
})