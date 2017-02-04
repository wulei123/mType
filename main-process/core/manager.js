const {ipcMain} = require('electron')

let files = [
	{
		id: 0,
		title: 'untitled',
		content: '#empty'
	},
	{
		id: 1,
		title: 'untitled1',
		content: '#empty1'
	}
]

ipcMain.on('title-to-content',(event,arg)=>{
	event.sender.send('content-get-values',arg)
})
ipcMain.on('content-to-title',(event,arg)=>{
	event.sender.send('title-get-values',arg)
})