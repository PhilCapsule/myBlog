const { query } = require('express');
var express = require('express');
var router = express.Router();

var request = require('sync-request');

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


// Add city 
router.post('/add-city', function(req,res,next){
    // console.log("bonne route");

    var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&lang=fr&units=metric&appid=578e4c04f9050d4e61bd79ac5f3c583e`)
    var dataAPI = JSON.parse(data.body)

    // console.log(dataAPI);

    var existDeja = false;

    for(var i = 0; i<cityList.length;i++){
        if(req.body.newcity.toLowerCase() == cityList[i].name.toLowerCase()){
            existDeja = true;
        }
    }

    // If don't exist
    if(existDeja == false && dataAPI.name){
        cityList.push({
            name: req.body.newcity,
            desc: dataAPI.weather[0].description,
            img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
            temp_min: dataAPI.main.temp_min,
            temp_max: dataAPI.main.temp_max,
        })
    }

    res.render('meteo', {cityList});
});

// UPDATE 
router.get('/update-cities', function(req,res,next){
    res.render('meteo', {cityList})
})



// DELETE -------------

router.get('/delete-city', function(req,res,next){
    // console.log(req.query);
    cityList.splice(req.query.position, 1)
    res.render('meteo', {cityList})
})



// API Sign in : up 


module.exports = router;


