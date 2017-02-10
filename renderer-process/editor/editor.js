const {ipcRenderer} = require('electron')
let marked = require('marked')
let highlight = require('highlight.js')


let editor = new Vue({
  el: '#editor',
  data: {
    index: -1,
    title:'',
    input: '# hello'
  },
  methods:{
    getValue:function (){
      ipcRenderer.on('content-get-values',(event,arg)=>{
        this.title = arg.title;
        this.index = arg.index;
        this.input = arg.content;
        console.log(this.input)
      })
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { gfm: true,
        highlight: function (code) {
    return highlight.highlightAuto(code).value;
  	},
  	tables: true,
  	breaks: false,
  	pedantic: false,
  	sanitize: false,
  	smartLists: true,
  	smartypants: false })
    }

  }
})

editor.$watch('input',function (newValue,oldValue){
  let arg = {index:this.index,content:this.input}
  ipcRenderer.send('content-to-title',arg)
})

editor.getValue()

ipcRenderer.on('to-save-this-file',(event)=>{
  let arg = {
    index:editor.index,
    title:editor.title,
    content:editor.input
  }
  ipcRenderer.send('to-save-file',arg)
})

ipcRenderer.on('alert-test',(event,arg)=>{
  alert(arg)
})

