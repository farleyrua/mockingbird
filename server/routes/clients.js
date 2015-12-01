// clients.js
//=======================================================================
//Con la llamada a module.exports conseguimos modularizarlo y 
//que pueda ser llamado desde el archivo principal de la aplicación.
var mongoose = require('mongoose');
//var Client = require('../model/client.js');
var Client = mongoose.model('Client');

	//GET - Return all clients in the DB
	exports.findAllClients = function(req, res){
		console.log('GET - /clients');
		return Client.find(function(err, clients){
			if (!err) {
				return res.send(clients);
			}else{
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}
		});
	};

	//GET - Return only one Client with specified ID
	exports.findById = function(req, res){
		console.log('GET - /client:id');
		return Client.findById(req.params.id,function(err, client){
			if(!client){
				res.statusCode = 404;
				return res.send({error: 'Not found'});				
			}
			if (!err) {				
		        return res.send({ status: 'OK', client:client });
		       
			} else {
		        res.statusCode = 500;
		        console.log('Internal error(%d): %s',res.statusCode,err.message);
		        return res.send({ error: 'Server error' });
     		}
		});
	};
	/*
	exports.addClient = function(req, res) {  
	    console.log('POST');
	    console.log(req.body);

	    var client = new Client({
	        username: 		req.body.username,
			email: 			req.body.email,
			password: 		req.body.password,
			recommendation: req.body.recommendation
	    });

	    client.save(function(err, client) {
	        if(err) return res.send(500, err.message);
	    //res.status(200).jsonp(client);
	    
	    });
	    res.send(client);
	};
	*/
	//POST - Insert a new Tshirt in the DB
	exports.addClient = function(req, res){
		console.log('POST - /client');
		console.log(req.body);
		var client = new Client({
			username: 		req.body.username,
			email: 			req.body.email,
			password: 		req.body.password,
			recommendation: req.body.recommendation
		});

		client.save(function(err){
			if (!err) {
				console.log("Client created");
				//return res.send({client:client });
			} else {
			    console.log(err);
			    if(err.name == 'ValidationError') {
			        res.statusCode = 400;
			        res.send({ error: 'Validation error' });
			    } else {
			        res.statusCode = 500;
			        res.send({ error: 'Server error' });
			    }
			    console.log('Internal error(%d): %s',res.statusCode,err.message);
			}				
		});
		res.send(client);
	};
	
	//DELETE - Delete a Client with specified ID
	exports.deleteClient = function(req, res) {
	    console.log("DELETE - /client/:id");
	    return Client.findById(req.params.id, function(err, client) {
	      if(!client) {
	        res.statusCode = 404;
	        return res.send({ error: 'Not found' });
	      }

	      return client.remove(function(err) {
	        if(!err) {
	          console.log('Removed client');
	          return res.send({ status: 'OK' });
	        } else {
	          res.statusCode = 500;
	          console.log('Internal error(%d): %s',res.statusCode,err.message);
	          return res.send({ error: 'Server error' });
	        }
	      })
	    });
	};

	//PUT - Update a register already exists

	//Link routes and functions
  	//app.get('/clients', findAllClients);
  	//app.get('/client/:id', findById);
  	//app.post('/client', addClient);
  	//app.put('/tshirt/:id', updateTshirt);
  	//app.delete('/tshirt/:id', deleteTshirt);

