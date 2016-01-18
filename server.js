//npm init
//npm install express body-parser cors mongojs --save
var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');
var ObjectId = require('mongodb').ObjectId;

var app = express();
app.use(bodyParser.json());

var nodePort = 3000;

//How to connect to database:
//Run mongod

var db = mongojs('birds', ['sightings']);

app.post('/api/sighting', function(req, res) {  //we only use next inside middleware.
 //db.sightings.insert() {}
	var dataToInsert = req.body;

	db.sightings.insert(dataToInsert, function(err, result) {
		if(err) {
			res.status(500).end();
		}
		res.send(result);
	});

});

app.get('/api/sighting', function(req, res) {
 //db.sightings.find();

 	db.sightings.find({}, function(err, result) {
		res.send(result);
 	})

 	console.log('get hit');

});

app.delete('/api/sighting/:id', function(req, res) {
 //db.sightings.remove();

 var idToDelete = ObjectId(req.params.id);

 db.sightings.remove({_id: idToDelete}, function(err, result) {
 	if(err) {
 		res.status(500).send("Failed to delete");

 	}
 	res.send("successfully deleted record")
 });

 
   //process worked but not sending back any data to the requester. Sends status code 200 instead.
});

app.put('/api/sighting/:id', function (req, res) {
 //db.sightings.findAndModify();

 var idToModify = ObjectId(req.params.id);

 var updateObject = {
 	query: {_id: idToModify},
 	update: { $set: req.body},
 	new: false
 }

 db.sightings.findAndModify(updateObject, function(err, result) {
 	res.send(result);
 })

 console.log('put hit');
});

app.listen(nodePort, function(){
	console.log('listening on port ' + nodePort);
});