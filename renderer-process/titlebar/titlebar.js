const {ipcRenderer} = require('electron')

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
	methods:{
		sendValue:function (index,content){
			let arg = {index:index,content:content}
			ipcRenderer.send('title-to-content',arg)
			console.log(arg)
		},
		getValue:function (){
			ipcRenderer.on('title-get-values',(event,arg)=>{
				if(arg.index>-1){
					this.tabs[arg.index].content = arg.content
					console.log(arg)
				}else{
					console.error('opps index < -1 ???')
				}
			})
		},
		countUntitled:function (){
			let count = 0;
			for(let i = 0; i < this.tabs.length;i++){
				if(this.tabs[i].title.indexOf('untitled')!==-1){count++}
			}
			return count
		},
		addNew:function (){
			ipcRenderer.on('new-file',(event,arg)=>{
				let template = {title:'untitled'+String(this.countUntitled()),content:''}
				this.tabs.push(template)
				
			})
		}
	}
})

tabs.getValue()
tabs.addNew()