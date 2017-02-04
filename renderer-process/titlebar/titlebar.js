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
		}
	}
})

tabs.getValue()

ipcRenderer.on('to-alert',(event,arg)=>{
	alert(arg)
})