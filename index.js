(function() {
"use strict";
console.log('LEAN IN!');
var PouchDB = require('pouchdb'),
    db = new PouchDB('lean-in');

db.post({
     date: new Date().toString(),
     url: document.location.href
});

db.changes({
    include_docs: true,
    live: true
}).on('change', function(entry) {
    console.log('Ch-Ch-Changes', entry.doc);
    //var doc = entry.doc;
    //document.write('<h1><span>'+doc.date+'</span><span>'+doc.url+'</span></h1>');
});

// db.replicate.to('http://example.com/mydb');
})();
