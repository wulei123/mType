const {ipcRenderer} = require('electron')
let marked = require('marked')
let highlight = require('highlight.js')


let editor = new Vue({
  el: '#editor',
  data: {
    index: 0,
    input: '# hello'
  },
  methods:{
    getValue:function (){
      ipcRenderer.on('content-get-values',(event,arg)=>{
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
  let arg = {index:0,content:this.input}
  ipcRenderer.send('content-to-title',arg)
})

editor.getValue()



