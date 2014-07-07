(function() {
"use strict";
console.log('LEAN IN!');
var PouchDB = require('pouchdb'),
    db = new PouchDB('lean-in'),
    DOM = require('./dom.js'),
    R = require('./resources.js');

DOM.appendToHead(DOM.link({rel:'stylesheet', href:R.css}));
DOM.appendToBody(DOM.div({'class':'lean-in-tab'}, DOM.div({'class':'icon'}), DOM.div({'class':'content', id:'lean-in-content'})));

function addContent(doc) {
	DOM.append(
		DOM.byId('lean-in-content'),
		DOM.div(
			DOM.h1(doc.date),
			DOM.div(doc.url)
		)
	);
}

db.post({
     date: new Date().toString(),
     url: document.location.href
});

db.changes({
    include_docs: true,
    live: true
}).on('change', function(entry) {
    console.log('Ch-Ch-Changes', entry.doc);
    addContent(entry.doc);
    //var doc = entry.doc;
    //document.write('<h1><span>'+doc.date+'</span><span>'+doc.url+'</span></h1>');
});

// db.replicate.to('http://example.com/mydb');
})();
