var express = require('express');
var router = express.Router();
var request = require('sync-request');

var cityModel = require('../models/cities')

var userModel = require('../models/users')




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});



// SIGN-UP 
router.post('/sign-up', async function(req,res,next){

    var searchUser = await userModel.findOne({
        email: req.body.emailFront
    })

    if(!searchUser){
        var newUser = new userModel({
            username: req.body.usernameFront,
            email: req.body.emailFront,
            password: req.body.passwordFront,
        })

        var newUserSave = await newUser.save();

        req.session.user = {
            name: newUserSave.username,
            id: newUserSave._id,
        }

        console.log(req.session.user)

        res.redirect('/meteo')

    }else {
        res.redirect('/')
    }

});



// // SIGN-IN
router.post('/sign-in', async function(req,res,next){

    var searchUser = await userModel.findOne({
      email: req.body.emailFront,
      password: req.body.passwordFront
    })
  
    if(searchUser != null){
      req.session.user = {
        name: searchUser.username,
        id: searchUser._id
      }
      res.redirect('/meteo')
    } else {
      res.render('login')
    }

});


// LOGOUT 
router.get('/logout', function(req,res,next){
    req.session.user = null;
    res.redirect('/')
})







router.get('/boutique', function(req, res, next){
  res.render('boutique')
});

router.get('/voyager', function(req,res,next){
  res.render('voyager')
});


router.get('/meteo', async function(req,res,next){

  if(req.session.user == null){
      res.redirect('/')
  }else{
      var cityList = await cityModel.find();
      res.render('meteo', {cityList})

  }

});


// Add city 
router.post('/add-city', async function(req,res,next){
    // console.log("bonne route");

    var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&lang=fr&units=metric&appid=578e4c04f9050d4e61bd79ac5f3c583e`)
    var dataAPI = JSON.parse(data.body)

    console.log(dataAPI);

    var existDeja = await cityModel.findOne({
        name: req.body.newcity.toLowerCase()
    }); 

    // If don't exist
    if(existDeja == null && dataAPI.name){
      
        var newCity = new cityModel({
            name: req.body.newcity,
            desc: dataAPI.weather[0].description,
            img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
            temp_min: dataAPI.main.temp_min,
            temp_max: dataAPI.main.temp_max, 
            lon: dataAPI.coord.lon,
            lat: dataAPI.coord.lat,
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
            name: cityList[i].name,
            desc: dataAPI.weather[0].description,
            img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
            temp_min: dataAPI.main.temp_min,
            temp_max: dataAPI.main.temp_max,
        })

    }

    var cityList = await cityModel.find();
    res.render('meteo', {cityList});
});



// DELETE -------------

router.get('/delete-city', async function(req,res,next){
    // console.log(req.query);

    await cityModel.deleteOne({
        _id: req.query.id
    })
    var cityList = await cityModel.find(); 
    res.render('meteo', {cityList})
});






module.exports = router;


