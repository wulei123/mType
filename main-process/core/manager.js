const {ipcMain,dialog} = require('electron')
const fs = require('fs')
ipcMain.on('title-to-content',(event,arg)=>{
	event.sender.send('content-get-values',arg)
})
ipcMain.on('content-to-title',(event,arg)=>{
	event.sender.send('title-get-values',arg)
})


ipcMain.on('to-save-file',(event,arg)=>{
	console.log(arg)
	dialog.showSaveDialog({
		title:'save files mType',
		defaultPath:arg.title,
		filters:[
			{name:'Markdown Files',extensions:['md']},
			{name:'All Files',extensions:['*']}
		]
	},(filename)=>{
		arg.filename = filename
		event.sender.send('save-file',arg)
	})
})
ipcMain.on('open-file',(event,arg)=>{
	dialog.showOpenDialog({
		title:'open file or directory mType',
		filters:[
			{name:'Markdown Files',extensions:['md']},
			{name:'All Files',extensions:['*']}
		],
		properties:['openFile','openDirectory']
	},(filepath)=>{
		event,sender.send('alert-test',filepath)
	})
})