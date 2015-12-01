// recommendations.js
//=======================================================================
//Con la llamada a module.exports conseguimos modularizarlo y 
//que pueda ser llamado desde el archivo principal de la aplicación.
var mongoose = require('mongoose');
var Recommendation = mongoose.model('Recommendation');
var today = new Date();
var day = today.getDate();//09;//
var month = today.getMonth()+1;//12;//
var year = today.getFullYear(); //2015;//

//Calcular fecha de recomendaciones hechas hoy
var today_date = year+"-"+month+"-"+day+"T00:00:00.000Z"

//Calcular fecha de recomendaciones hechas desde la última semana
var sevenDaysAgo = day-7;
var date_last_week = year+"-"+month+"-"+sevenDaysAgo+"T00:00:00.000Z";

//Calcular fecha de recomendaciones hechas desde hace un mes
var last_month = month-1;
var date_last_month =  year+"-"+last_month+"-"+day+"T00:00:00.000Z";

//Calcular fecha de recomendaciones hechas desde hace un año
var last_year = year-1;
var date_last_year =  last_year+"-"+month+"-"+day+"T00:00:00.000Z";
	
	exports.prueba = function(req, res){
		console.log('GET - /prueba');
		return Recommendation.find('song.name',function(err, recommendations){
			if (!err) {
				var resultados = new Array();
				Recommendation.distinct("song.name",function(err, ordenadas){
					for(i=0;i<ordenadas.length;i++){
						resultados.push({'name':ordenadas[i], 'artist':'','cantidad':0});
					}
					for(i=0;i<resultados.length;i++){
						for(j=0;j<recommendations.length;j++){
							if ( recommendations[j]['song']['name'] == resultados[i]['name'] ) {
								resultados[i]['cantidad'] = resultados[i]['cantidad'] + 1;
								resultados[i]['artist'] = recommendations[j]['song']['artist'];
							}
						}						
					}
					resultados.sort(function(a,b){
						return b.cantidad - a.cantidad;
					});
					console.log(resultados);
					return res.send(resultados);
				});
			}else{
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}
		});
	};

	exports.findRecommendationsToday = function(req, res){
		console.log('GET - /today_recommendations');
		console.log('Recomendaciones hechas desde: '+today_date);
		return Recommendation.find( {"date" : {"$gte": new Date(today_date)} }, function(err, recommendations){
			if (!err) {
				return res.send(recommendations);
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error: 'Server error' });
			}
		});
	};

	exports.findRecommendationsLastWeek = function(req, res){
		console.log('GET - /last_week_recommendations');
		console.log('Recomendaciones hechas desde: '+date_last_week);
		return Recommendation.find( {"date" : {"$gte": new Date(date_last_week)} }, function(err, recommendations){
			if (!err) {
				var resultados = new Array();
				Recommendation.distinct("song.name",function(err, ordenadas){
					for(i=0;i<ordenadas.length;i++){
						resultados.push({'name':ordenadas[i], 'artist':'','cantidad':0});
					}
					for(i=0;i<resultados.length;i++){
						for(j=0;j<recommendations.length;j++){
							if ( recommendations[j]['song']['name'] == resultados[i]['name'] ) {
								resultados[i]['cantidad'] = resultados[i]['cantidad'] + 1;
								resultados[i]['artist'] = recommendations[j]['song']['artist'];
							}
						}						
					}
					resultados.sort(function(a,b){
						return b.cantidad - a.cantidad;
					});
					console.log(resultados);
					return res.send(resultados);
				});
			}else{
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}
		});
	};

	exports.findRecommendationsLastMonth = function(req, res){
		console.log('GET - /last_month_recommendations');
		console.log('Recomendaciones hechas desde: '+date_last_month);
		return Recommendation.find( {"date" : {"$gte": new Date(date_last_month)} }, function(err, recommendations){
			if (!err) {
				var resultados = new Array();
				Recommendation.distinct("song.name",function(err, ordenadas){
					for(i=0;i<ordenadas.length;i++){
						resultados.push({'name':ordenadas[i], 'artist':'','cantidad':0});
					}
					for(i=0;i<resultados.length;i++){
						for(j=0;j<recommendations.length;j++){
							if ( recommendations[j]['song']['name'] == resultados[i]['name'] ) {
								resultados[i]['cantidad'] = resultados[i]['cantidad'] + 1;
								resultados[i]['artist'] = recommendations[j]['song']['artist'];
							}
						}						
					}
					resultados.sort(function(a,b){
						return b.cantidad - a.cantidad;
					});
					console.log(resultados);
					return res.send(resultados);
				});
			}else{
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}
		});
	};

	exports.findRecommendationsLastYear = function(req, res){
		console.log('GET - /last_year_recommendations');
		console.log('Recomendaciones hechas desde: '+date_last_year);
		return Recommendation.find( {"date" : {"$gte": new Date(date_last_year)} }, function(err, recommendations){
			if (!err) {
				var resultados = new Array();
				Recommendation.distinct("song.name",function(err, ordenadas){
					for(i=0;i<ordenadas.length;i++){
						resultados.push({'name':ordenadas[i], 'artist':'','cantidad':0});
					}
					for(i=0;i<resultados.length;i++){
						for(j=0;j<recommendations.length;j++){
							if ( recommendations[j]['song']['name'] == resultados[i]['name'] ) {
								resultados[i]['cantidad'] = resultados[i]['cantidad'] + 1;
								resultados[i]['artist'] = recommendations[j]['song']['artist'];
							}
						}						
					}
					resultados.sort(function(a,b){
						return b.cantidad - a.cantidad;
					});
					console.log(resultados);
					return res.send(resultados);
				});
			}else{
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}
		});
	};

	//GET - Return all clients in the DB
	exports.findAllRecommendations = function(req, res){
		console.log('GET - /recommendations');
		return Recommendation.find(function(err, recommendations){
			if (!err) {
				return res.send(recommendations);
			}else{
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}
		});
	};

	//GET - Return only one Recommendation with specified ID
	exports.findById = function(req, res){
		console.log('GET - /recommendation:id');
		return Recommendation.findById(req.params.id,function(err, recommendation){
			if(!recommendation){
				res.statusCode = 404;
				return res.send({error: 'Not found'});				
			}
			if (!err) {				
		        return res.send({ status: 'OK', recommendation:recommendation });
		       
			} else {
		        res.statusCode = 500;
		        console.log('Internal error(%d): %s',res.statusCode,err.message);
		        return res.send({ error: 'Server error' });
     		}
		});
	};
	

	//POST - Insert a new Tshirt in the DB
	exports.addRecommendation = function(req, res){
		console.log('POST - /recommendation');
		console.log(req.body);
		var cancion = req.body.song.name;
		
		var recommendation = new Recommendation({
			song:   		req.body.song
		});

		recommendation.save(function(err){
			if (!err) {
				console.log("Recommendation created");
				return res.send(recommendation);
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
		//res.send(recommendation);
	};
	
	//DELETE - Delete a Client with specified ID
	exports.deleteRecommendation = function(req, res) {
	    console.log("DELETE - /recommendation/:id");
	    return Recommendation.findById(req.params.id, function(err, recommendation) {
	      if(!recommendation) {
	        res.statusCode = 404;
	        return res.send({ error: 'Not found' });
	      }

	      return recommendation.remove(function(err) {
	        if(!err) {
	          console.log('Removed recommendation');
	          return res.send({ status: 'OK' });
	        } else {
	          res.statusCode = 500;
	          console.log('Internal error(%d): %s',res.statusCode,err.message);
	          return res.send({ error: 'Server error' });
	        }
	      })
	    });
	};



