let marked = require('marked')
let highlight = require('highlight.js')


new Vue({
  el: '#editor',
  data: {
    input: '# hello'
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