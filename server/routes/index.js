
var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var mongoose = require('mongoose');
var products = require('./products.js');
var user = require('./users.js');
var clients = require('./clients.js');
var recommendations = require('./recommendations.js');
var songs = require('./songs.js');
/*
* Routes that can be accessed by any one
*/

router.post('/login', auth.login);

router.route('/clients').get(clients.findAllClients);
router.route('/client/:id').get(clients.findById);
router.post('/client', clients.addClient);
router.delete('/client/:id', clients.deleteClient);

router.route('/prueba').get(recommendations.prueba);
router.route('/today_recommendations').get(recommendations.findRecommendationsToday);
router.route('/last_week_recommendations').get(recommendations.findRecommendationsLastWeek);
router.route('/last_month_recommendations').get(recommendations.findRecommendationsLastMonth);
router.route('/last_year_recommendations').get(recommendations.findRecommendationsLastYear)
router.route('/recommendations').get(recommendations.findAllRecommendations);
router.route('/recommendation/:id').get(recommendations.findById);
router.post('/recommendation', recommendations.addRecommendation);
router.delete('/recommendation/:id', recommendations.deleteRecommendation);

router.route('/artistsByGenre/:id').get(songs.findArtistsByGenre);
router.route('/genres').get(songs.findGenres);

router.route('/songsByGenre/:id').get(songs.findSongsByGenre);
router.route('/songsByArtist/:id').get(songs.findSongsByArtist);
router.route('/songByName/:id').get(songs.findSongByName);
router.route('/songs').get(songs.findAllSongs);
router.route('/song/:id').get(songs.findById);
router.post('/song', songs.addSong);
router.delete('/song/:id', songs.deleteSong);
/*
* Routes that can be accessed only by autheticated users
*/

router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);
/*
* Routes that can be accessed only by authenticated & authorized users
*/

router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
module.exports = router;
