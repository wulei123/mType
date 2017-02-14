const fs = require('fs')
const {ipcRenderer} = require('electron')

function findAllFiles(dirpath){
	alert('this is a directory')
}

ipcRenderer.on('open-file',(event,path)=>{
})