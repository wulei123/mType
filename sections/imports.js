/*import the sections into main tag*/
let links = document.querySelectorAll('link[rel="import"]')
Array.prototype.forEach.call(links,function (link) {
	let template = link.import.querySelector('template');
	let clone = document.importNode(template.content,true)
	document.querySelector('main').appendChild(clone);
})