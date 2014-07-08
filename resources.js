
var toDataUrl = function (content, mimeType) {
		return 'data:'+mimeType+';base64,'+content;
	},  
	R = { },
	fs = require('fs'),
    css = fs.readFileSync(__dirname+'/build/styles-packed.css', 'base64');

R.css = toDataUrl(css, 'text/css');

module.exports = R;

