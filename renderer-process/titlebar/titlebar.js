const {ipcRenderer} = require('electron');
const {dialog} = require('electron').remote;
const fs = require('fs');
const Vue = require('vue/dist/vue.common');

let tabs = new Vue({
	el: '#tabs',
	data:{
		tabs:[
			{
				title:'untitled',
				content:'# mType'
			}
		]
	},
	created(){
		if(this.tabs.length==1){
			this.sendValue(0,this.tabs[0].content);
		}
	},
	methods:{
		sendValue:function (index,content){
			let arg = {index:index,title:this.tabs[index].title,content:content};
			ipcRenderer.send('title-to-content',arg);
			console.log(arg);
		},
		getValue:function (){
			ipcRenderer.on('title-get-values',(event,arg)=>{
				if(arg.index>-1){
					this.tabs[arg.index].content = arg.content;
					console.log(arg);
				}else{
					console.error('opps index < -1 ???');
				}
			});
		},
		countUntitled:function (){
			let count = 0;
			for(let i = 0; i < this.tabs.length;i++){
				if(this.tabs[i].title.indexOf('untitled')!==-1){count++;}
			}
			return count;
		},
		addNew:function (){
			ipcRenderer.on('new-file',(event,arg)=>{
				let template = {title:'untitled'+String(this.countUntitled()),content:'# mType'};
				this.tabs.push(template);
				
			});
		},
		close:function (index){
			if(this.tabs[index].content){
				let options = {
					type:'question',
					message:'content has changed, do you want to save it?',
					buttons:['ok','no','cancel']
				};
				let arg = {
					index:index,
					title:this.tabs[index].title,
					content:this.tabs[index].content
				};
				dialog.showMessageBox(options,(i)=>{
					switch(i){
					case 0:
						ipcRenderer.send('to-save-file',arg);
						break;
					case 1:
						this.removeTab(index);
						break;

					}
				});
			}
		},
		removeTab:function (index){
			this.tabs.splice(index,1);
			this.sendValue(index-1,this.tabs[index-1].content);
		},
		saveFile:function (){
			ipcRenderer.on('save-file',(event,arg)=>{
				console.log(arg);
				fs.writeFile(arg.filename,arg.content,(err)=>{
					if(err) alert(err);
					alert('saved');
					this.removeTab(arg.index);
				});
			});
		},
		openFile:function (){
			ipcRenderer.on('open-file',(event,arg)=>{
				console.log(arg);
				this.tabs.push(arg);			
			});
		},
		ipc:function(){
			this.getValue();
			this.addNew();
			this.saveFile();
			this.openFile();
		}
	}
});


tabs.ipc();