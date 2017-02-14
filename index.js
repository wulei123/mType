const {app,BrowserWindow} = require('electron')
const glob = require('glob')

function initialize(){
	loadMainProcess();
	createWindow();
}

function createWindow(){
	app.on('ready',()=>{
		const path = `file://${__dirname}/index.html`
		const win = new BrowserWindow({width:800,height:600})
		win.loadURL(path);
	});
}

function loadMainProcess(){
	const path = `${__dirname}/main-process/**/*.js`
	const files = glob.sync(path)
	files.forEach((file)=>require(file));
}

initialize()




