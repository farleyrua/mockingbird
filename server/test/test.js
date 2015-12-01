var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should'); 
var request = require('supertest');  

var url = 'http://localhost:3001';
describe('Calculator tests', function () {

    function add(x, y){
        return x+y;
    }
    
     function subtract(x, y){
        return x-y;
    }

    function multiply(x, y){
        return x*y;
    }

    function divide(x, y){
        return x/y;
    }

    it('should return 5', function () {
        assert.equal(add(2,3), 5);
    });

    it('should return 2', function () {
        assert.equal(subtract(5,3), 2);
    });

    it('should return 6', function () {
        assert.equal(multiply(2,3), 6);
    });

    it('should return 5', function () {
        assert.equal(divide(15,3), 5);
    });    

});

describe('Web Service of Song object', function(){
    /*
    it('Should return that it inserted a new client', function(done){
        var client =  {
            username: 'farleyrua',
            email: 'farley.rua@udea.edu.co',
            password: '1234567',
        };        
        request(url)
        .post('/client')
        .send(client)
        .end(function(err, res){
            if(err){
                throw err;
            }
            res.status.should.equal(200); 
            done();
        });        
    });
    it('Should return that it inserted a new song', function(done){
        var song =  {
            name: 'El cantante',
            artist: 'Héctor Lavoe',
            genre: 'Salsa',
            age: '1978',
            duration: '10:23',
            album: 'Comedia',
            score: '12'
        };        
        request(url)
        .post('/song')
        .send(song)
        .end(function(err, res){
            if(err){
                throw err;
            }
            res.status.should.equal(200); 
            done();
        });        
    });
*/
    it('Should return that it inserted a new recommendation', function(done){
        var recommendation =  {
            song:{
                name: 'El cantante',
                artist: 'Héctor Lavoe',
                genre: 'Salsa',
                age: '1978',
                duration: '10:23',
                album: 'Comedia',
                score: '12'
            }
        };        
        request(url)
        .post('/recommendation')
        .send(recommendation)
        .end(function(err, res){
            if(err){
                throw err;
            }
            res.status.should.equal(200); 
            done();
        });        
    });
});

//
//mocha -R html-cov > coverage.html
