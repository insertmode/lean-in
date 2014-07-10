(function() {
	"use strict";
	console.log('LEAN IN!');
	
	var instanceId = 'DEV',
		syncURL = 'http://127.0.0.1:5984/leanin',
		PouchDB = require('pouchdb'),
	    db = new PouchDB('lean-in'),
	    DOM = require('./dom.js'),
	    R = require('./resources.js');
	
	window.leanin = {};
	window.leanin[instanceId] = {
			db: db,
			pouchdb: PouchDB,
			dom: DOM
	};
	
	function toggleClass(elem, c) {
		var currentClass = elem.getAttribute('class');
		if (-1 == currentClass.indexOf(c)) {
			currentClass += ' '+c;
		} else {
			currentClass = currentClass.replace(' '+c, '');
			currentClass = currentClass.replace(c, '');
		}
		elem.setAttribute('class', currentClass);
	}
	
	function addClass(elem, c) {
		var currentClass = elem.getAttribute('class');
		if (-1 == currentClass.indexOf(c)) {
			currentClass += ' '+c;
			currentClass = currentClass.replace(c, '');
			elem.setAttribute('class', currentClass);
		}
	}

	function removeClass(elem, c) {
		var currentClass = elem.getAttribute('class');
		if (-1 != currentClass.indexOf(c)) {
			currentClass = currentClass.replace(' '+c, '');
			currentClass = currentClass.replace(c, '');
			elem.setAttribute('class', currentClass);
		}
	}
	
	
	function classToggler(c) {
		return function() {
			return toggleClass(this, c);
		};
	}
	
	function removeAll() {
		db.allDocs({include_docs:true}, 
				function(err,res) {
					var rows = res.rows;
					for (var i=0,n=rows.length;i<n;++i) {
						console.log("remove: ", rows[i]);
						db.remove(res.rows[i].doc, function(err,res){ 
							console.log(err); 
						}); 
					} 
				}
		);
	}
	
	function syncAll() {
		db.replicate.from(syncURL);
		db.replicate.to(syncURL);
	}
	
	DOM.appendToHead(DOM.link({rel:'stylesheet', href:R.css}));
	DOM.appendToBody(
			DOM.div(
					{'class':'lean-in-tab', 'onclick':classToggler('hover') }, 
					DOM.div({'class':'icon'}), 
					DOM.div({'class':'content'},
							DOM.div(
									DOM.div(
										DOM.button({onclick:removeAll}, 'Remove All'),
										DOM.button({onclick:syncAll}, 'Sync All')
									),
									DOM.form(
											{onsubmit: function(e) { e.preventDefault(); saveItem(this); return false; } },
											DOM.textarea({name:'comment'}),
											DOM.div(
												DOM.button({type:'submit'}, 'create new')
											)
									)
							),
							DOM.div({id:'lean-in-content'})
					)
			));
	
	function removeItem(oldDoc) {
		db.remove(oldDoc);
	}

	function saveItem(form, oldDoc) {
		var doc = oldDoc || {};
		
		if (!doc.date) {
			doc.date = new Date().toString();
		}
		
		if (!doc._id) {
			doc._id = instanceId +'_'+ doc.date + '/'+Math.floor(Math.random()*10000); //TODO: + user
		}
		
		if (!doc.url) {
			doc.url = document.location.href;
		}
		
		var elem = form.firstChild;
		while (null != elem) {
			if (elem.getAttribute('name')) {
				doc[elem.getAttribute('name')] = elem.value;
			}
			elem = elem.nextSibling;
		}
		if (null != doc.comment) {
			db.put(doc);
		}
	}
	
	function editItem(doc) {
		var saveHandler = function(e) { 
			e.preventDefault(); 
			saveItem(this, doc); 
			return false; 
		};
		DOM.replace(
				DOM.byId(doc._id),
				DOM.div(
						{id:doc._id},
						DOM.h1(doc.date),
						DOM.form({onsubmit:saveHandler },
							DOM.textarea({name:'comment'},''+(doc.comment||doc.url)),
							DOM.button({type:'submit'}, 'save')
						)
					)
		);
	}
	
	function addedContent(doc) {
		if (!doc._deleted) {
			var newItem = DOM.div(
					{id:doc._id},					
					DOM.h1(doc.date),
					DOM.div(doc.comment||doc.url),
					DOM.button({onclick:editItem.bind(null,doc)}, 'edit'),
					DOM.button({onclick:removeItem.bind(null,doc)}, 'delete')
				),
				oldItem = DOM.byId(doc._id);
			
			if (oldItem) {
				DOM.replace(oldItem, newItem);
			} else {
				DOM.append(DOM.byId('lean-in-content'), newItem);
			}
			
			
		} else {
			DOM.remove(DOM.byId(doc._id));
		}
	}
	
	db.changes({
	    include_docs: true,
	    live: true
	}).on('change', function(entry) {
	    console.log('Ch-Ch-Changes', entry.doc);
	    addedContent(entry.doc);
	    //var doc = entry.doc;
	    //document.write('<h1><span>'+doc.date+'</span><span>'+doc.url+'</span></h1>');
	});
	
	// db.replicate.to('http://example.com/mydb');
})();
