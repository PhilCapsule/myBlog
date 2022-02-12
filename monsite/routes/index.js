var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/erreur404', function(req, res, next){
  res.render('erreur');
});

router.get('/boutique', function(req, res, next){
  res.render('boutique')
});

router.get('/voyager', function(req,res,next){
  res.render('voyager')
});

router.get('/meteo', function(req,res,next){
  res.render('meteo')
})

// voir if redirect
router.post('/log-in', function(req,res,next){
  res.render('log-in')
});


module.exports = router;


