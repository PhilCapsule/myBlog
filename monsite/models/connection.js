/*Atlas*/ 
var mongoose = require('mongoose'); 

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

/*Atlas*/ 
mongoose.connect('mongodb+srv://wesler013:oVe7mZIprm0xkpQ6@cluster0.klocy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    options,
    function(err){
        console.log("erreur ? : => " , err);
})

module.exports = mongoose;