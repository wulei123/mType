const fs = require('fs')
const {ipcRenderer} = require('electron')


let files = []

function findAllFiles(dirpath){
	alert('this is a directory')
}
function openFile(path,callback){
	let temp = path[0].split('\\').reverse();
	let title = temp[0].split('.')[0];
	fs.readFile(path[0],'utf8',(err,data)=>{
		if(err) throw err;
		let arg = {
			title:title,
			content:data
		}
		callback(arg)
	})
}
ipcRenderer.on('open-file-path',(event,path)=>{
	openFile(path,(arg)=>{
		files.push(arg)
		ipcRenderer.send('to-open-file',arg)
	})
})

