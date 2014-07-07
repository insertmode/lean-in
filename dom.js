


var DOM = {};

DOM._element = function(name) {
	var elem = document.createElement(name);
	for (var i = 1, n = arguments.length; i < n; ++i) {
		var thisOne = arguments[i];
		if (typeof thisOne == 'string') {
			elem.appendChild(document.createTextNode(thisOne));
		} else if (null != thisOne.nodeName) {
			elem.appendChild(thisOne);
		} else if (typeof thisOne == 'object') {
			for (var x in thisOne) {
				if (thisOne.hasOwnProperty(x)) {
					elem.setAttribute(x, thisOne[x]);
				}
			}
		}
	}
	return elem;
};

var tags = "div span input style script link button input textarea h1 h2 h3 h4".split(' ');
for (var i = 0, n = tags.length; i < n; ++i) {
	var thisOne = tags[i];
	DOM[thisOne] = DOM._element.bind(DOM, thisOne);
}

DOM.append = function (to, elem) {
	to.appendChild(elem);
};
DOM.appendToBody = function(elem) {
	DOM.append(document.body, elem);
};
DOM.appendToHead = function(elem) {
	DOM.append(document.head, elem);
};
DOM.byId = function(id) {
	return document.getElementById(id);
};


module.exports = DOM;
