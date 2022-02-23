const { query } = require('express');
var express = require('express');
var router = express.Router();

var request = require('sync-request');
const { update } = require('./bdd');

var cityModel = require('./bdd')


// /fakeDB 
//add humidité 
// var cityList = [

// ]


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


router.get('/meteo', async function(req,res,next){

  var cityList = await cityModel.find();
  res.render('meteo', {cityList})
})

// voir if redirect et POST 
router.get('/login', function(req,res,next){
  res.render('login');
});


// Add city 
router.post('/add-city', async function(req,res,next){
    // console.log("bonne route");

    var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&lang=fr&units=metric&appid=578e4c04f9050d4e61bd79ac5f3c583e`)
    var dataAPI = JSON.parse(data.body)

    var existDeja = await cityModel.findOne({
        name: req.body.newcity.toLowerCase()
    }); 

    // console.log(dataAPI);

    // If don't exist
    if(existDeja == null && dataAPI.name){
      
        var newCity = new cityModel({
            name: req.body.newcity,
            desc: dataAPI.weather[0].description,
            img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
            temp_min: dataAPI.main.temp_min,
            temp_max: dataAPI.main.temp_max, 
        })

        await newCity.save(); 
    }

    cityList = await cityModel.find();
    res.render('meteo', {cityList});
});

// UPDATE do call BDD
router.get('/update-cities', async function(req,res,next){
    var cityList = await cityModel.find();

    for(var i = 0; i<cityList.length; i++){
        var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&lang=fr&units=metric&appid=578e4c04f9050d4e61bd79ac5f3c583e`)
        var dataAPI = JSON.parse(data.body)

        await cityModel.updateOne({
            _id: cityList[i].id
        },{
            name: req.body.newcity,
            desc: dataAPI.weather[0].description,
            img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
            temp_min: dataAPI.main.temp_min,
            temp_max: dataAPI.main.temp_max,
        })

    }


    res.render('meteo', {cityList})
})



// DELETE -------------

router.get('/delete-city', async function(req,res,next){
    // console.log(req.query);

    await cityModel.deleteOne({
        id: req.query.id
    })
    var cityList = await cityModel.find(); 
    res.render('meteo', {cityList})
})



// API Sign in : up 


module.exports = router;


