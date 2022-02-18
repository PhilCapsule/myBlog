var express = require('express');
var router = express.Router();

// /fakeDB 
//add humidité 
var cityList = [
    {name: "marseille", desc:"couvert", img:"images/picto-1.png", temp_min: 2, temp_max: 8 },
    {name: "Aberdeen", desc:"couvert", img:"images/picto-1.png", temp_min: -3, temp_max: 5 },
    {name: "Londres", desc:"couvert", img:"images/picto-1.png", temp_min: 4, temp_max: 7 },
    {name: "Hampshire", desc:"couvert", img:"images/picto-1.png", temp_min: 1, temp_max: 10 },
]



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// add btn for path 
// router.get('/erreur404', function(req, res, next){
//   res.render('erreur');
// });

router.get('/boutique', function(req, res, next){
  res.render('boutique')
});

router.get('/voyager', function(req,res,next){
  res.render('voyager')
});

router.get('/meteo', function(req,res,next){
  res.render('meteo', {cityList})
})

// voir if redirect  et POST 
router.get('/login', function(req,res,next){
  res.render('login');
});


module.exports = router;


