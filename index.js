(function() {
"use strict";
console.log('LEAN IN!');
var PouchDB = require('pouchdb'),
    db = new PouchDB('lean-in');

db.post({
     date: new Date().toString(),
     url: document.location.href
});

db.changes().on('change', function(doc) {
    console.log('Ch-Ch-Changes', doc);
});

// db.replicate.to('http://example.com/mydb');
})();
