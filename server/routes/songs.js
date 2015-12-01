// songs.js
//=======================================================================
//Con la llamada a module.exports conseguimos modularizarlo y 
//que pueda ser llamado desde el archivo principal de la aplicación.
var mongoose = require('mongoose');
var Song = mongoose.model('Song');
	
	exports.findGenres = function(req, res) {
		console.log('GET - /genres');
		return Song.find({ },{"genre":1, "_id":0}, function(err, genres){
			if (!err) {
				return res.send(genres);
			}
			else{
				res.statusCode = 500;
				console.log();
				return res.send('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
	};

	exports.findSongByName = function(req, res) {
		console.log('GET - /songByName:name');
		return Song.find({ "name" : req.params.id}, function(err, song){
			if (!err) {
				return res.send(song);
			}
			else{
				res.statusCode = 500;
				console.log();
				return res.send('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
	};

	exports.findArtistsByGenre = function(req, res) {
		console.log('GET - /artistsByGenre:genre');
		return Song.find({ "genre" : req.params.id},{"artist":1, "_id": 0}, function(err, artist){
			if (!err) {
				return res.send(artist);
			}
			else{
				res.statusCode = 500;
				console.log();
				return res.send('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
	};

	exports.findSongsByGenre = function(req, res) {
		console.log('GET - /songsByGenre:genre');
		return Song.find({ "genre" : req.params.id}, function(err, songs){
			if (!err) {
				return res.send(songs);
			}
			else{
				res.statusCode = 500;
				console.log();
				return res.send('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
	};

	exports.findSongsByArtist = function(req, res) {
		console.log('GET - /songByArtist:artist');
		return Song.find({ "artist" : req.params.id}, function(err, songs){
			if (!err) {
				return res.send(songs);
			}
			else{
				res.statusCode = 500;
				console.log();
				return res.send('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
	};

	//GET - Return all songs in the DB
	exports.findAllSongs = function(req, res){
		console.log('GET - /songs');
		return Song.find(function(err, songs){
			if (!err) {
				return res.send(songs);
			}else{
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}
		});
	};

	//GET - Return only one Song with specified ID
	exports.findById = function(req, res){
		console.log('GET - /song:id');
		return Song.findById(req.params.id,function(err, song){
			if(!song){
				res.statusCode = 404;
				return res.send({error: 'Not found'});				
			}
			if (!err) {				
		        return res.send({ status: 'OK', song:song });
		       
			} else {
		        res.statusCode = 500;
		        console.log('Internal error(%d): %s',res.statusCode,err.message);
		        return res.send({ error: 'Server error' });
     		}
		});
	};

	//POST - Insert a new Song in the DB
	exports.addSong = function(req, res){
		console.log('POST - /song');
		console.log(req.body);
		var song = new Song({
			name: 		req.body.name,
			artist: 	req.body.artist,
			genre: 		req.body.genre,
			age: 		req.body.age,
			duration: 	req.body.duration,
			album: 		req.body.album,
			score: 		req.body.score
		});

		song.save(function(err){
			if (!err) {
				console.log("Song created");
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
		res.send(song);
	};
	
	//DELETE - Delete a Song with specified ID
	exports.deleteSong = function(req, res) {
	    console.log("DELETE - /song/:id");
	    return Song.findById(req.params.id, function(err, song) {
	      if(!song) {
	        res.statusCode = 404;
	        return res.send({ error: 'Not found' });
	      }

	      return song.remove(function(err) {
	        if(!err) {
	          console.log('Removed song');
	          return res.send({ status: 'OK' });
	        } else {
	          res.statusCode = 500;
	          console.log('Internal error(%d): %s',res.statusCode,err.message);
	          return res.send({ error: 'Server error' });
	        }
	      });
	    });
	};
